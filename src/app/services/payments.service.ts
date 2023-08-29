import {Injectable} from '@nestjs/common';
import {OrdersService} from './orders.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly ordersService: OrdersService) {}

  createACharge(createPaymentDto: CreatePaymentDto) {
    throw new Error('Method not implemented.');
  }
}
