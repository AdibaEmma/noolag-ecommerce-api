import {EmailVerificationDto, SendResetPasswordCodeDto} from '@app/dtos';
import {
  password_reset_html,
  password_reset_text,
  successful_password_reset_text,
  successful_password_reset_html,
  successful_registration_html,
  successful_registration_text,
  verified_email_html,
  verified_email_text,
  order_placed_text,
  order_placed_html,
  order_cancelled_text,
  order_cancelled_html,
  order_shipped_text,
  order_shipped_html,
} from '@app/helpers';
import {Injectable, Logger, UnauthorizedException, UnprocessableEntityException} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import {UsersService} from './users.service';
import crypto from 'crypto';

@Injectable()
export class EmailService {
  EMAIL_FROM = process.env.EMAIL_FROM;
  EMAIL_APP_USER = process.env.EMAIL_APP_USER;
  EMAIL_APP_PASSWORD = process.env.EMAIL_APP_PASSWORD;
  private transporter: nodemailer.Transporter;

  constructor(
    private readonly usersService: UsersService,
    private readonly logger: Logger,
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.EMAIL_APP_USER,
        pass: this.EMAIL_APP_PASSWORD,
      },
    });
  }

  public async verifyEmail(emailVerificationDto: EmailVerificationDto): Promise<any> {
    const {email, token} = emailVerificationDto;
    const user = await this.usersService.findUserByEmail(email);
    if (user?.isEmailVerified) {
      throw new UnprocessableEntityException({
        message: 'Email already verified',
      });
    }

    if (token !== user?.emailVerificationCode) {
      throw new UnauthorizedException({
        message: 'Invalid token',
      });
    }

    user.isEmailVerified = true;
    user.emailVerificationCode = null;

    await user.save();

    await this.sendAccountVerifiedEmail(user.email, user.firstName);

    return {
      message: 'Email verified successfully',
    };
  }

  public async sendResetPasswordCode(sendResetPasswordCodeDto: SendResetPasswordCodeDto): Promise<any> {
    const existingUser = await this.usersService.findUserByEmail(sendResetPasswordCodeDto.email);
    if (!existingUser) {
      throw new UnauthorizedException({
        message: 'Account not found',
      });
    }

    const token = crypto.randomInt(100000, 1000000);

    existingUser.passwordResetCode = token;
    await existingUser.save();
    await this.sendResetPasswordEmail(existingUser.email, existingUser.passwordResetCode);
    return {
      message: 'Password reset email sent',
    };
  }

  public async sendResetPasswordEmail(to: string, token: number): Promise<void> {
    const subject = 'Reset password';
    const text = password_reset_text(token);
    const html = password_reset_html(token);
    await this.sendEmail(to, subject, text, html);
  }

  public async sendResetPasswordSuccessEmail(to: string, name: string): Promise<any> {
    const subject = 'Reset password success';
    const text = successful_password_reset_text(name);
    const html = successful_password_reset_html(name);
    await this.sendEmail(to, subject, text, html);
  }

  public async sendSuccessfulRegistration(to: string, token: any, name: string): Promise<void> {
    const subject = 'Email Verification';
    const text = successful_registration_text(name, token);
    const html = successful_registration_html(name, token);
    await this.sendEmail(to, subject, text, html);
  }

  public async sendAccountVerifiedEmail(to: string, name: string): Promise<void> {
    const subject = 'Account Created Successfully';
    const text = verified_email_text(name);
    const html = verified_email_html(name);
    await this.sendEmail(to, subject, text, html);
  }

  public async sendOrderPlacedEmail(to: string, name: string, orderId: number): Promise<void> {
    const subject = 'Order placed successfully';
    const text = order_placed_text(name, orderId);
    const html = order_placed_html(name, orderId);
    await this.sendEmail(to, subject, text, html);
  }

  public async sendOrderCancelledEmail(to: string, name: string, orderId: number): Promise<void> {
    const subject = 'Order cancelled';
    const text = order_cancelled_text(name, orderId);
    const html = order_cancelled_html(name, orderId);
    await this.sendEmail(to, subject, text, html);
  }

  public async sendOrderShippedEmail(to: string, name: string, trackingNumber: number): Promise<void> {
    const subject = 'Order has been shipped';
    const text = order_shipped_text(name, trackingNumber);
    const html = order_shipped_html(name, trackingNumber);
    await this.sendEmail(to, subject, text, html);
  }

  private async sendEmail(to: string, subject: string, text: string, html: string): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: this.EMAIL_FROM,
      to,
      subject,
      text,
      html,
    };
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
