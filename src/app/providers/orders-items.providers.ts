import {ordersConstants} from '@app/constants';
import {OrderItem} from '@app/entities';

export const orderItemsProviders = [
  {
    provide: ordersConstants.orderItems_repository,
    useValue: OrderItem,
  },
];
