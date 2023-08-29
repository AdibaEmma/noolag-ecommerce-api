import {Injectable} from '@nestjs/common';
import {OrdersService} from './orders.service';
import {RequestService} from './requests.service';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly APIRequest: RequestService,
  ) {}

  async createCharge(createPaymentDto: CreatePaymentDto) {}
}
