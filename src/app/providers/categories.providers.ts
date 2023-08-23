import { CATEGORY_CONSTANTS } from '@app/constants';
import { Category } from '@app/entities';

const { categories_repository } = CATEGORY_CONSTANTS;

export const categoriesProviders = [
  {
    provide: categories_repository,
    useValue: Category,
  },
];
