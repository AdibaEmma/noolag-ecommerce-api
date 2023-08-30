/* eslint-disable @typescript-eslint/no-unused-vars */
import {PaymentMethod} from '@app/enums';
import {IsCurrencySymbol} from '@app/validators';
import {ApiProperty} from '@nestjs/swagger';
import {IsDecimal, IsEmail, IsNotEmpty, IsNumber, IsPositive} from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  orderId: number;

  @IsNotEmpty()
  @IsDecimal()
  @ApiProperty({
    type: Number,
    description: 'This is a required property',
  })
  amount: number;

  @IsNotEmpty()
  @IsCurrencySymbol()
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  currency: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  email: string;
}
