import {ordersConstants} from '@app/constants';
import {Order, OrderItem} from '@app/entities';
import {Inject, Injectable} from '@nestjs/common';
import {RedisService} from './redis.service';
import {CreateOrderDto} from '@app/dtos';
import {ProductsService} from './products.service';
import {UsersService} from './users.service';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ordersConstants.orders_repository) private ordersRepository: typeof Order,
    @Inject(ordersConstants.orderItems_repository) private orderItemsRepository: typeof OrderItem,
    private readonly redisService: RedisService,
    private readonly productsService: ProductsService,
    private readonly userService: UsersService,
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
}
