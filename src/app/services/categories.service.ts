import {Category, Product} from '@app/entities';
import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category,
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async createCategory(categoryData: Partial<Category>): Promise<Category> {
    const category = await this.categoryModel.create(categoryData);
    return category;
  }

  async findAllCategories(): Promise<Category[]> {
    return this.categoryModel.findAll({
      include: [Product],
    });
  }
}
