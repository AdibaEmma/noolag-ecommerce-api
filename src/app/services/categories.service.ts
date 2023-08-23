import { CATEGORY_CONSTANTS, PRODUCT_CONSTANTS } from '@app/constants';
import { Category, Product } from '@app/entities';
import { Inject, Injectable } from '@nestjs/common';

const { categories_repository: CATEGORIES_REPOSITORY } = CATEGORY_CONSTANTS;
const { products_repository: PRODUCTS_REPOSITORY } = PRODUCT_CONSTANTS;
@Injectable()
export class CategoriesService {
  constructor(
    @Inject(CATEGORIES_REPOSITORY)
    private categoryRepository: typeof Category,
    @Inject(PRODUCTS_REPOSITORY)
    private productRepository: typeof Product,
  ) { }

  async createCategory(categoryData: Partial<Category>): Promise<Category> {
    const category = await this.categoryRepository.create(categoryData);
    return category;
  }

  async findAllCategories(): Promise<Category[]> {
    return this.categoryRepository.findAll({
      include: [Product],
    });
  }
}
