import {IsEmail, IsNotEmpty, IsNumber} from 'class-validator';

export class EmailVerificationDto {
  @IsNotEmpty()
  @IsEmail({}, {message: 'Please enter a valid email'})
  email: string;

  @IsNotEmpty()
  @IsNumber()
  token: number;
}
