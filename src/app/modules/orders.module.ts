import {OrdersService} from '@app/services/orders.service';
import {Module} from '@nestjs/common';
import {DatabaseModule} from './database.module';
import {ordersProviders} from '@app/providers/orders.providers';
import {OrdersController} from '@app/controllers/orders.controller';
import {CategoriesService, ProductsService, UsersService, ValidationService} from '@app/services';
import {orderItemsProviders} from '@app/providers/orders-items.providers';
import {RedisService} from '@app/services/redis.service';
import {JwtService} from '@nestjs/jwt';
import {categoriesProviders, productsProviders, usersProviders} from '@app/providers';
import {rolesProviders} from '@app/providers/roles.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    ValidationService,
    RedisService,
    ProductsService,
    CategoriesService,
    UsersService,
    JwtService,
    ...ordersProviders,
    ...orderItemsProviders,
    ...productsProviders,
    ...categoriesProviders,
    ...usersProviders,
    ...rolesProviders,
  ],
})
export class OrdersModule {}
