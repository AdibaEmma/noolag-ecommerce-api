import {productsConstants} from '@app/constants';
import {Product} from '@app/entities';

export const productsProviders = [
  {
    provide: productsConstants.products_repository,
    useValue: Product,
  },
];
