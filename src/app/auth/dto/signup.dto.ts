import {Match} from '@app/decorators/match.decorator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsAlphanumeric, IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength} from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  email: string;

  @IsAlphanumeric()
  @ApiPropertyOptional({
    type: String,
    description: 'This is an optional property',
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak, It should contain at least, 1 Uppercase, 1 Numeric, 1 Lowercase, 1 special characters',
  })
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Match('password', {message: 'password does not match'})
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  confirmPassword: string;
}
