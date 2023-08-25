import {CreateCategoryDto} from '@app/dtos/create-category.dto';
import {UpdateCategoryDto} from '@app/dtos/update-category.dto';
import {Category, Product} from '@app/entities';
import {ConflictException, Inject, Injectable, MethodNotAllowedException, NotFoundException} from '@nestjs/common';
import {RedisService} from './redis.service';
import {categoriesConstants, productsConstants} from '@app/constants/constants';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(categoriesConstants.categories_repository)
    private categoryRepository: typeof Category,
    @Inject(productsConstants.products_repository)
    private productRepository: typeof Product,
    private readonly redisService: RedisService,
  ) {}

  async createCategory(categoryData: CreateCategoryDto): Promise<Category> {
    const {name} = categoryData;
    const existingCategory = await this.categoryRepository.findOne({where: {name}});

    if (existingCategory) {
      throw new ConflictException(`Category with name '${name}' already exists.`);
    }
    const category = await this.categoryRepository.create(categoryData);
    return category;
  }

  async findAllCategories(): Promise<Category[]> {
    const cachedCategories = await this.redisService.get('allCategories');
    const categories = await this.categoryRepository.findAll({
      include: [Product],
    });

    if (categories.length === cachedCategories.length) {
      return cachedCategories;
    }

    await this.redisService.set('allCategories', categories);
    return categories;
  }

  async findCategoryById(id: number): Promise<Category | null> {
    const category = await this.categoryRepository.findByPk(id, {
      include: [Product],
    });

    if (!category) {
      throw new NotFoundException(`Category with id '${id}' not found.`);
    }

    return category;
  }

  async updateCategory(id: number, updateRequest: UpdateCategoryDto): Promise<Category> {
    const {name, description} = updateRequest;
    let changes = false;
    const category = await this.findCategoryById(id);

    if (name.length > 3 && category.name != name) {
      category.name = name;
      changes = true;
    }

    if (description.length > 0 && category.description != description) {
      category.description = description;
      changes = true;
    }

    if (!changes) {
      throw new MethodNotAllowedException('Could not perform update');
    }
    await category.save();
    return category;
  }

  async deleteCategory(id: number): Promise<void> {
    const category = await this.findCategoryById(id);

    await category.destroy();
  }
}
