/* eslint-disable @typescript-eslint/no-unused-vars */
import {PaymentMethod} from '@app/enums';
import {IsCurrencySymbol} from '@app/validators';
import {IsDecimal, IsEmail, IsNotEmpty, IsNumber, IsPositive} from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  orderId: number;

  @IsNotEmpty()
  @IsDecimal()
  amount: number;

  @IsNotEmpty()
  @IsCurrencySymbol()
  currency: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
