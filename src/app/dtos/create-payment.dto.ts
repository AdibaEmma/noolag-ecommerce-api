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
    description: 'The orderId of to add to the transaction',
    example: 1,
  })
  orderId: number;

  @IsNotEmpty()
  @IsDecimal()
  @ApiProperty({
    type: Number,
    description: 'Amount to be charged',
    example: 5000.0,
  })
  amount: number;

  @IsNotEmpty()
  @IsCurrencySymbol()
  @ApiProperty({
    type: String,
    description: 'The currency to charge in',
    example: 'GHS',
  })
  currency: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'Email of the customer',
    example: 'johndoe@example.com',
  })
  email: string;
}
