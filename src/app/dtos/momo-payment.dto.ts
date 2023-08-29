import {IsMobileMoneyPhoneNumber} from '@app/validators';
import {IsNotEmpty, IsString} from 'class-validator';

export class MomoPaymentDto {
  @IsMobileMoneyPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsString()
  provider: string;
}
