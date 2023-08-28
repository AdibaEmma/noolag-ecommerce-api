import { CurrentUser } from '@app/decorators';
import { CreateOrderDto } from '@app/dtos';
import { User } from '@app/entities';
import { AuthGuard } from '@app/guards';
import { ValidationService } from '@app/services';
import { OrdersService } from '@app/services/orders.service';
import { Body, Controller, Inject, Post, UseGuards, forwardRef } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller()
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(
    @Inject(forwardRef(() => OrdersService)) private readonly ordersService: OrdersService,
    @Inject(forwardRef(() => ValidationService)) private readonly validationService: ValidationService,
  ) {}

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto, @CurrentUser() user: any) {
    console.log(user);
    return this.ordersService.createOrder(createOrderDto, user.sub);
  }
}
