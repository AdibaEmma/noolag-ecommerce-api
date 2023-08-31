import {Inject, Injectable, NotFoundException} from '@nestjs/common';
import {RequestService} from './requests.service';
import {METHODS} from '@app/enums';
import {CreatePaymentDto} from '@app/dtos';
import {ordersConstants, transactionsConstants} from '@app/constants';
import {Order, Transaction} from '@app/entities';
import {randomUUID} from 'crypto';

@Injectable()
export class PaymentsService {
  PAYSTACK_URL = process.env.PAYSTACK_URL;
  PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;
  constructor(
    @Inject(transactionsConstants.transactions_repository) private transactionsRepository: typeof Transaction,
    @Inject(ordersConstants.orders_repository) private ordersRepository: typeof Order,
    private readonly APIRequest: RequestService,
  ) {}

  async initiateTransaction(createPaymentDto: CreatePaymentDto, userId: number): Promise<any> {
    const {orderId, email, amount, currency} = createPaymentDto;
    const unit_amount = 100;

    const order = await this.ordersRepository.findOne({where: {id: orderId, userId}});
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const params = {
      email: email,
      amount: amount * unit_amount,
      currency: currency,
      channels: ['card', 'bank', 'mobile_money', 'ussd'],
      transaction_charge: 5 * unit_amount,
      callback_url: 'http://localhost:5000/api/v1/payments/verify-transaction',
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
      url: `${this.PAYSTACK_URL}/transaction/initialize`,
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

  async verifyTransaction(transactionReference: string) {
    const verificationResponse = await this.APIRequest.request({
      method: METHODS.GET,
      url: `${this.PAYSTACK_URL}/transaction/verify/${transactionReference}`,
      headers: {
        Authorization: 'Bearer ' + this.PAYSTACK_SECRET_KEY,
        'Content-Type': 'application/json',
      },
    });

    const {
      status,
      metadata,
      transaction_date,
      paidAt,
      customer,
      authorization,
      fees,
      currency,
      channel,
      card_type,
      amount,
      gateway_response,
      reference,
      receipt_number,
    } = verificationResponse.data;

    const orderId = parseInt(metadata?.custom_fields[0]?.value);
    const transaction = await this.transactionsRepository.create({
      id: randomUUID(),
      orderId,
      status,
      transactionDate: transaction_date,
      paidAt,
      authorizationCode: authorization?.authorization_code,
      reference,
      receipt_number,
      amount,
      fees,
      channel,
      card_type,
      currency,
      bank: authorization?.bank,
      mobile_money_number: authorization?.mobile_money_number,
      customerId: customer?.id,
      message: gateway_response,
    });

    return await transaction.reload({
      attributes: [
        'id',
        'orderId',
        'status',
        'transactionDate',
        'paidAt',
        'receipt_number',
        'fees',
        'amount',
        'currency',
        'channel',
        'bank',
        'message',
      ],
    });
  }
}
