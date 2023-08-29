import {IsInt, IsNotEmpty, IsNumberString} from 'class-validator';

export class BankPaymentDto {
  @IsNotEmpty()
  @IsNumberString()
  account_number: string;

  @IsNotEmpty()
  @IsInt()
  @IsNumberString()
  code: number;
}
