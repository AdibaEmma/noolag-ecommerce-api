import {ordersConstants} from '@app/constants';
import {Order, OrderItem, User} from '@app/entities';
import {ConflictException, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {RedisService} from './redis.service';
import {CreateOrderDto, ShipOrderDto} from '@app/dtos';
import {ProductsService} from './products.service';
import {UsersService} from './users.service';
import {OrderStatus} from '@app/enums';
import {EmailService} from './email.service';
import crypto from 'crypto';
import {calculateHash} from '@app/helpers';

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

  async createOrder(createOrderDto: CreateOrderDto, user: User): Promise<Order> {
    const {totalCost, shippingAddress, billingAddress, discountAmount, taxAmount, shippingFee, notes, orderItems} = createOrderDto;

    await this.userService.findUserById(user.id);

    const order = await this.ordersRepository.create({
      totalCost,
      shippingAddress,
      billingAddress,
      discountAmount,
      taxAmount,
      shippingFee,
      notes,
      userId: user.id,
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

    await this.emailService.sendOrderPlacedEmail(user.email, user.firstName, order.id);
    return order;
  }

  async findOrdersByUserId(userId: number): Promise<Order[]> {
    const cachedUserOrdersJson = await this.redisService.get('allUserOrders');

    if (cachedUserOrdersJson) {
      const cachedUserOrders = JSON.parse(cachedUserOrdersJson);
      const cachedHash = calculateHash(cachedUserOrders);

      const categories = await this.ordersRepository.findAll({where: {userId, isDeleted: false}});

      const currentHash = calculateHash(categories);

      if (cachedHash === currentHash) {
        return cachedUserOrders;
      }
    }

    const userOrders = await this.ordersRepository.findAll({where: {userId, isDeleted: false}});

    await this.redisService.set('allUserOrders', JSON.stringify(userOrders));
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

  async cancelOrder(id: number, user: User): Promise<any> {
    const order = await this.findUserOrderById(id, user.id);

    order.orderStatus = OrderStatus.Cancelled;
    await order.save();
    await this.emailService.sendOrderCancelledEmail(user.email, user.firstName, id);
  }

  async shipOrder(id: number, userId: number, shipOrderDto: ShipOrderDto): Promise<any> {
    const order = await this.findUserOrderById(id, userId);

    if (order.orderStatus !== OrderStatus.Processing) {
      throw new ConflictException('Order is not processed for shipping');
    }

    const trackingNumber = crypto.randomInt(100000, 1000000);

    order.$set('trackingNumber', trackingNumber);
    order.$set('orderStatus', OrderStatus.Shipped);
    order.$set('shippedDate', Date.now());
    order.estimatedArrivalDate = shipOrderDto.eta;
    await order.save();

    return {
      message: 'order shipped',
    };
  }

  async deleteOrder(id: number, userId: number): Promise<void> {
    const userOrder = await this.findUserOrderById(id, userId);

    userOrder.isDeleted = true;

    await userOrder.save();
  }
}
