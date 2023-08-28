import {ordersConstants} from '@app/constants';
import {Order} from '@app/entities/orders.entity';

export const ordersProviders = [
  {
    provide: ordersConstants.orders_repository,
    useValue: Order,
  },
];
