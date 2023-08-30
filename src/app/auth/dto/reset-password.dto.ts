import {Match} from '@app/decorators';
import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength} from 'class-validator';

export class ResetPasswordDTO {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    type: Number,
    description: 'Token from password reset request',
    example: 123456,
  })
  token: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak, It should contain at least, 1 Uppercase, 1 Numeric, 1 Lowercase, 1 special characters',
  })
  @ApiProperty({
    type: String,
    description: 'New password',
    example: 'Testpassword@1',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Match('password', {message: 'password does not match'})
  @ApiProperty({
    type: String,
    description: 'New password confirmation',
    example: 'Testpassword@1',
  })
  confirmPassword: string;
}
