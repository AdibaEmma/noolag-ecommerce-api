import {IsEmail, IsNotEmpty} from 'class-validator';

export class SendResetPasswordCodeDto {
  @IsNotEmpty()
  @IsEmail({}, {message: 'Please enter a valid email'})
  email: string;
}
