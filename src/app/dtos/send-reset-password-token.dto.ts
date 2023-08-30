import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty} from 'class-validator';

export class SendResetPasswordCodeDto {
  @IsNotEmpty()
  @IsEmail({}, {message: 'Please enter a valid email'})
  @ApiProperty({
    type: String,
    description: 'Email required to send reset code',
    example: 'validemail@example.com',
  })
  email: string;
}
