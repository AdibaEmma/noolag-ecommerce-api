import {PaymentMethod} from '@app/enums';
import {IsCurrencySymbol, IsPaymentMethod} from '@app/validators';
import {IsDecimal, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsPositive} from 'class-validator';

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

  @IsEnum(PaymentMethod)
  @IsPaymentMethod()
  paymentMethod: PaymentMethod;
}
