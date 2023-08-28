import {ValidationService} from '@app/services';
import {OrdersService} from '@app/services/orders.service';
import {Controller, Inject, forwardRef} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('orders')
@Controller()
export class OrdersController {
  constructor(
    @Inject(forwardRef(() => OrdersService)) private readonly ordersService: OrdersService,
    @Inject(forwardRef(() => ValidationService)) private readonly validationService: ValidationService,
  ) {}
}
