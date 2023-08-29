import {IsNotEmpty, IsCreditCard, IsNumberString} from 'class-validator';

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
}
