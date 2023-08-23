import { PRODUCT_CONSTANTS } from '@app/constants';
import { Product } from '@app/entities';

const { products_repository: PRODUCTS_REPOSITORY } = PRODUCT_CONSTANTS;

export const productsProviders = [
  {
    provide: PRODUCTS_REPOSITORY,
    useValue: Product,
  },
];
