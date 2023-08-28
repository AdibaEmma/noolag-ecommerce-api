import {OrdersService} from '@app/services/orders.service';
import {Module} from '@nestjs/common';
import {DatabaseModule} from './database.module';
import {ordersProviders} from '@app/providers/orders.providers';
import {OrdersController} from '@app/controllers/orders.controller';
import {ValidationService} from '@app/services';

@Module({
  imports: [DatabaseModule],
  controllers: [OrdersController],
  providers: [OrdersService, ValidationService, ...ordersProviders],
})
export class OrdersModule {}
