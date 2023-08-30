import {Injectable} from '@nestjs/common';
import {RequestService} from './requests.service';
import {METHODS} from '@app/enums';
import {CreatePaymentDto} from '@app/dtos';

@Injectable()
export class PaymentsService {
    PAYSTACK_URL = process.env.PAYSTACK_URL;
    PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

  constructor(private readonly APIRequest: RequestService) {}

  async initiateTransaction(createPaymentDto: CreatePaymentDto): Promise<any> {
    const {orderId, email, amount, currency} = createPaymentDto;
    const unit_amount = 100;

    const params = {
      email: email,
      amount: amount * unit_amount,
      currency: currency,
      channels: ['card', 'bank', 'mobile_money', 'ussd'],
      transaction_charge: 5 * unit_amount,
      metadata: {
        custom_fields: [
          {
            value: orderId,
            display_name: 'Payment for order',
            variable_name: 'payment_for_order',
          },
        ],
      },
    };

    const chargeResponse = await this.APIRequest.request({
      method: METHODS.POST,
      url: this.PAYSTACK_URL + '/transaction/initialize',
      headers: {
        Authorization: 'Bearer ' + this.PAYSTACK_SECRET_KEY,
        'Content-Type': 'application/json',
      },
      params: {
        port: 443,
      },
      data: params,
    });

    return chargeResponse;
  }
}
