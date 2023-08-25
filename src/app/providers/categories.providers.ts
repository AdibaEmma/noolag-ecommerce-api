import {categoriesConstants} from '@app/constants';
import {Category} from '@app/entities';

export const categoriesProviders = [
  {
    provide: categoriesConstants.categories_repository,
    useValue: Category,
  },
];
