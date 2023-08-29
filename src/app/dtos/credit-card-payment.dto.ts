import {IsNotEmpty, IsCreditCard, IsNumberString, IsInt} from 'class-validator';

export class CreditCardPaymentDto {
  @IsNotEmpty()
  @IsCreditCard()
  cardNumber: string;

  @IsNotEmpty()
  expirationMonth: string;

  @IsNotEmpty()
  expirationYear: string;

  @IsNotEmpty()
  @IsNumberString()
  cvv: string;

  @IsNotEmpty()
  @IsInt()
  @IsNumberString()
  amount: number;
}
