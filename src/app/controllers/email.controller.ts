import {Inject, Body, Controller, Post, forwardRef} from '@nestjs/common';
import {EmailVerificationDto, SendResetPasswordCodeDto} from '@app/dtos';
import {EmailService, ValidationService} from '@app/services';

@Controller()
export class EmailController {
  constructor(
    @Inject(forwardRef(() => EmailService)) private readonly emailService: EmailService,
    @Inject(forwardRef(() => ValidationService)) private readonly validationService: ValidationService,
  ) {}

  @Post('/verify')
  async verifyEmail(@Body() emailVerificationDto: EmailVerificationDto): Promise<void> {
    await this.validationService.validateDto<EmailVerificationDto>(EmailVerificationDto, emailVerificationDto);
    return await this.emailService.verifyEmail(emailVerificationDto);
  }

  @Post('/send-reset-password-code')
  async sendResetPasswordCode(@Body() sendResetPasswordCodeDto: SendResetPasswordCodeDto) {
    await this.validationService.validateDto<SendResetPasswordCodeDto>(SendResetPasswordCodeDto, sendResetPasswordCodeDto);
    return await this.emailService.sendResetPasswordCode(sendResetPasswordCodeDto);
  }
}
