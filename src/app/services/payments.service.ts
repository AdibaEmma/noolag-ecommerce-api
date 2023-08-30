import {Inject, Injectable} from '@nestjs/common';
import {RequestService} from './requests.service';
import {METHODS} from '@app/enums';
import {CreatePaymentDto} from '@app/dtos';
import {transactionsConstants} from '@app/constants';
import {Transaction} from '@app/entities';
import {randomUUID} from 'crypto';

@Injectable()
export class PaymentsService {
  PAYSTACK_URL = process.env.PAYSTACK_URL;
  PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

  constructor(
    @Inject(transactionsConstants.transactions_repository) private transactionsRepository: typeof Transaction,
    private readonly APIRequest: RequestService,
  ) {}

  async initiateTransaction(createPaymentDto: CreatePaymentDto): Promise<any> {
    const {orderId, email, amount, currency} = createPaymentDto;
    const unit_amount = 100;

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

    /*
    {
  status: true,
  message: 'Verification successful',
  data: {
    id: 3068710035,
    domain: 'test',
    status: 'success',
    reference: '2mvogv7gg7',
    receipt_number: '10101',
    amount: 500000,
    message: null,
    gateway_response: 'Approved',
    paid_at: '2023-08-30T11:46:41.000Z',
    created_at: '2023-08-30T11:46:32.000Z',
    channel: 'mobile_money',
    currency: 'GHS',
    ip_address: '154.160.0.93',
    metadata: { custom_fields: [Array] },
    log: {
      start_time: 1693396000,
      time_spent: 2,
      attempts: 1,
      errors: 0,
      success: false,
      mobile: false,
      input: [],
      history: [Array]
    },
    fees: 9750,
    fees_split: null,
    authorization: {
      authorization_code: 'AUTH_5d3m95034v',
      bin: '055XXX',
      last4: 'X987',
      exp_month: '12',
      exp_year: '9999',
      channel: 'mobile_money',
      card_type: '',
      bank: 'MTN',
      country_code: 'GH',
      brand: 'Mtn',
      reusable: false,
      signature: null,
      account_name: null,
      mobile_money_number: '0551234987',
      receiver_bank_account_number: null,
      receiver_bank: null
    },
    customer: {
      id: 136741192,
      first_name: null,
      last_name: null,
      email: 'eabaagah@gmail.com',
      customer_code: 'CUS_22f90l3spzdj0ov',
      phone: null,
      metadata: null,
      risk_action: 'default',
      international_format_phone: null
    },
    plan: null,
    split: {},
    order_id: null,
    paidAt: '2023-08-30T11:46:41.000Z',
    createdAt: '2023-08-30T11:46:32.000Z',
    requested_amount: 500000,
    pos_transaction_data: null,
    source: null,
    fees_breakdown: null,
    transaction_date: '2023-08-30T11:46:32.000Z',
    plan_object: {},
    subaccount: {}
  }
}

    */

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
    } = verificationResponse;

    const transaction = await this.transactionsRepository.create({
      id: randomUUID(),
      orderId: metadata?.custom_fields?.value,
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
      bank: authorization.bank,
      mobile_money_number: authorization?.mobile_money_number,
      customerId: customer.id,
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
