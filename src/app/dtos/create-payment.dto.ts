import {PaymentMethod} from '@app/enums';
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
  @IsEmail()
  email: string;

  paymentMethod: PaymentMethod;

  
}
