import {CurrentUser} from '@app/decorators';
import {CreateOrderDto} from '@app/dtos';
import {Order} from '@app/entities';
import {AuthGuard} from '@app/guards';
import {ValidationService} from '@app/services';
import {OrdersService} from '@app/services/orders.service';
import {Body, Controller, Get, Inject, Param, Post, Put, UseGuards, forwardRef} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

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
    return this.ordersService.createOrder(createOrderDto, user.sub);
  }

  @Get()
  getUserOrders(@CurrentUser() user: any): Promise<Order[]> {
    return this.ordersService.findOrdersByUserId(user.sub);
  }

  @Get(':id')
  getUserOrderById(@Param('id') id: number, @CurrentUser() user: any): Promise<Order> {
    return this.ordersService.findUserOrderById(id, user.sub);
  }

  @Put(':id/cancel')
  cancelOrder(@Param('id') id: number, @CurrentUser() user: any): Promise<void> {
    return this.ordersService.cancelOrder(id, user.sub);
  }
}
