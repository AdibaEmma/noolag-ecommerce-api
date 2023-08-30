import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsNumber} from 'class-validator';

export class EmailVerificationDto {
  @IsNotEmpty()
  @IsEmail({}, {message: 'Please enter a valid email'})
  @ApiProperty({
    type: Number,
    description: 'User registered email',
    example: 'johndoe@example.com',
  })
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Token generated from user registration to verify email',
    example: 123456,
  })
  token: number;
}
