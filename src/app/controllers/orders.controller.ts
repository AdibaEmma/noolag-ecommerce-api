import {CurrentUser, Roles} from '@app/decorators';
import {CreateOrderDto} from '@app/dtos';
import {Order} from '@app/entities';
import {AuthGuard, RolesGuard} from '@app/guards';
import {ValidationService} from '@app/services';
import {OrdersService} from '@app/services/orders.service';
import {Body, Controller, Get, Inject, Param, Post, Put, UseGuards, forwardRef} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('orders')
@Controller()
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(
    @Inject(forwardRef(() => OrdersService)) private readonly ordersService: OrdersService,
    @Inject(forwardRef(() => ValidationService)) private readonly validationService: ValidationService,
  ) {}

  @Post()
  @ApiOperation({summary: 'Create Order'})
  @ApiCreatedResponse({description: 'Created successfully', type: Order})
  @ApiResponse({status: 409, description: 'Conflict: Missing Field(s)'})
  @ApiUnprocessableEntityResponse({description: 'Bad Request: Validation Failed'})
  @ApiForbiddenResponse({description: 'Unauthorized Request'})
  createOrder(@Body() createOrderDto: CreateOrderDto, @CurrentUser() user: any) {
    return this.ordersService.createOrder(createOrderDto, user.sub);
  }

  @Get()
  @ApiOperation({summary: 'Find User Orders'})
  @ApiOkResponse({description: 'Orders returned successfully'})
  @ApiForbiddenResponse({description: 'Unauthorized Request'})
  getUserOrders(@CurrentUser() user: any): Promise<Order[]> {
    return this.ordersService.findOrdersByUserId(user.sub);
  }

  @Get(':id')
  @ApiOperation({summary: 'Get User Order'})
  @ApiOkResponse({description: 'Order returned successfully', type: Order})
  @ApiNotFoundResponse({description: 'Order not found'})
  @ApiNotFoundResponse({description: 'User not found'})
  @ApiForbiddenResponse({description: 'Unauthorized Request'})
  getUserOrderById(@Param('id') id: number, @CurrentUser() user: any): Promise<Order> {
    return this.ordersService.findUserOrderById(id, user.sub);
  }

  @Put(':id/cancel')
  @ApiOperation({summary: 'Cancel User Order'})
  @ApiOkResponse({description: 'Cancelation successful'})
  @ApiNotFoundResponse({description: 'Order not found'})
  @ApiNotFoundResponse({description: 'User not found'})
  @ApiForbiddenResponse({description: 'Unauthorized Request'})
  cancelOrder(@Param('id') id: number, @CurrentUser() user: any): Promise<void> {
    return this.ordersService.cancelOrder(id, user.sub);
  }

  @Put(':id/ship-order')
  @UseGuards(RolesGuard)
  @Roles('admin')
  shipOrder(@Param('id') id: number, @CurrentUser() user: any): Promise<void> {
    return this.ordersService.shipOrder(id, user.sub);
  }
}
