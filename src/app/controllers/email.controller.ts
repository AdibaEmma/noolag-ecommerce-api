import {Inject, Body, Controller, Post, forwardRef, UseGuards} from '@nestjs/common';
import {EmailVerificationDto, SendResetPasswordCodeDto} from '@app/dtos';
import {EmailService, ValidationService} from '@app/services';
import {ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnprocessableEntityResponse} from '@nestjs/swagger';
import {RolesGuard} from '@app/guards';
import {Roles} from '@app/decorators';

@ApiTags('email')
@Controller()
export class EmailController {
  constructor(
    @Inject(forwardRef(() => EmailService)) private readonly emailService: EmailService,
    @Inject(forwardRef(() => ValidationService)) private readonly validationService: ValidationService,
  ) {}

  @Post('/verify')
  @UseGuards(RolesGuard)
  @ApiOperation({summary: 'Verify User Email'})
  @ApiOkResponse({description: 'Verified successfully'})
  @ApiBadRequestResponse({description: 'Bad Request: Validation Failed'})
  @ApiUnprocessableEntityResponse({description: 'Email already verified'})
  async verifyEmail(@Body() emailVerificationDto: EmailVerificationDto): Promise<void> {
    await this.validationService.validateDto<EmailVerificationDto>(EmailVerificationDto, emailVerificationDto);
    return await this.emailService.verifyEmail(emailVerificationDto);
  }

  @Post('/send-reset-password-code')
  @ApiOperation({summary: 'Send Reset Password Code'})
  @ApiOkResponse({description: 'Verified successfully'})
  @ApiBadRequestResponse({description: 'Bad Request: Validation Failed'})
  async sendResetPasswordCode(@Body() sendResetPasswordCodeDto: SendResetPasswordCodeDto) {
    await this.validationService.validateDto<SendResetPasswordCodeDto>(SendResetPasswordCodeDto, sendResetPasswordCodeDto);
    return await this.emailService.sendResetPasswordCode(sendResetPasswordCodeDto);
  }
}
