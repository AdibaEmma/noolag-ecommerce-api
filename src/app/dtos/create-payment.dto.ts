/* eslint-disable @typescript-eslint/no-unused-vars */
import {PaymentMethod} from '@app/enums';
import {IsCurrencySymbol, IsPaymentMethod} from '@app/validators';
import {IsDecimal, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, ValidateIf, ValidateNested} from 'class-validator';
import {MomoPaymentDto} from './momo-payment.dto';
import {CreditCardPaymentDto} from './credit-card-payment.dto';
import {Type} from 'class-transformer';
import {BankPaymentDto} from './bank-payment.dto';

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

  @ValidateIf((object, value) => object.paymentMethod === PaymentMethod.Momo)
  @ValidateNested()
  @Type(() => MomoPaymentDto)
  momoPaymentDetails: MomoPaymentDto;

  @ValidateIf((object, value) => object.paymentMethod === PaymentMethod.CreditCard)
  @ValidateNested()
  @Type(() => CreditCardPaymentDto)
  creditCardPaymentDetails: CreditCardPaymentDto;

  @ValidateIf((object, value) => object.paymentMethod === PaymentMethod.Bank)
  @ValidateNested()
  @Type(() => BankPaymentDto)
  bankPaymentDetails: BankPaymentDto;
}
