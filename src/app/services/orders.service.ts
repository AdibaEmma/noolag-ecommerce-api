import {ordersConstants} from '@app/constants';
import {Order, OrderItem} from '@app/entities';
import {ConflictException, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {RedisService} from './redis.service';
import {CreateOrderDto} from '@app/dtos';
import {ProductsService} from './products.service';
import {UsersService} from './users.service';
import {OrderStatus} from '@app/enums';
import { EmailService } from './email.service';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ordersConstants.orders_repository) private ordersRepository: typeof Order,
    @Inject(ordersConstants.orderItems_repository) private orderItemsRepository: typeof OrderItem,
    private readonly redisService: RedisService,
    private readonly productsService: ProductsService,
    private readonly userService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto, userId: number): Promise<Order> {
    const {totalCost, shippingAddress, billingAddress, discountAmount, taxAmount, shippingFee, notes, orderItems} = createOrderDto;

    await this.userService.findUserById(userId);

    const order = await this.ordersRepository.create({
      totalCost,
      shippingAddress,
      billingAddress,
      discountAmount,
      taxAmount,
      shippingFee,
      notes,
      userId,
    });

    const orderItemsPromises = orderItems.map(async (item) => {
      const product = await this.productsService.findProductById(item.productId);

      const subtotal = product.price * item.quantity;

      return this.orderItemsRepository.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        subtotal,
      });
    });

    await Promise.all(orderItemsPromises);

    return order;
  }

  async findOrdersByUserId(userId: number): Promise<Order[]> {
    const userOrders = await this.ordersRepository.findAll({where: {userId}});
    return userOrders;
  }

  async findUserOrderById(id: number, userId: number): Promise<Order> {
    const userOrder = await this.ordersRepository.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!userOrder) {
      throw new NotFoundException(`Order with id '${id}' not found.`);
    }

    return userOrder;
  }

  async cancelOrder(id: number, userId: number): Promise<void> {
    const order = await this.findUserOrderById(id, userId);

    order.orderStatus = OrderStatus.Cancelled;
    await order.save();
  }

  async shipOrder(id: number, userId: number): Promise<any> {
    const order = await this.findUserOrderById(id, userId);

    if (!order.orderStatus == OrderStatus.Processing) {
      throw new ConflictException('Order is not processed for shipping');
    }

    order.$set('orderStatus', OrderStatus.Shipped);
    await order.save();
    
    return {
      message: 'order shipped',
    };
  }
}
