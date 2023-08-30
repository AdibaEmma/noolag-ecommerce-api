import {Inject, Body, Controller, Post, forwardRef, UseGuards} from '@nestjs/common';
import {EmailVerificationDto, SendResetPasswordCodeDto} from '@app/dtos';
import {EmailService, ValidationService} from '@app/services';
import {ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiUnprocessableEntityResponse} from '@nestjs/swagger';
import {RolesGuard} from '@app/guards';
import {Roles} from '@app/decorators';

@Controller()
export class EmailController {
  constructor(
    @Inject(forwardRef(() => EmailService)) private readonly emailService: EmailService,
    @Inject(forwardRef(() => ValidationService)) private readonly validationService: ValidationService,
  ) {}

  @Post('/verify')
  @UseGuards(RolesGuard)
  @Roles('user')
  @ApiOperation({summary: 'Verify User Email'})
  @ApiCreatedResponse({description: 'Verified successfully'})
  @ApiBadRequestResponse({description: 'Bad Request: Validation Failed'})
  @ApiUnprocessableEntityResponse({description: 'Email already verified'})
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
