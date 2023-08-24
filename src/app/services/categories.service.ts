import {CATEGORY_CONSTANTS, PRODUCT_CONSTANTS} from '@app/constants';
import {CreateCategoryDto} from '@app/dtos/create-category.dto';
import {UpdateCategoryDto} from '@app/dtos/update-category.dto';
import {Category, Product} from '@app/entities';
import {ConflictException, Inject, Injectable, MethodNotAllowedException, NotFoundException} from '@nestjs/common';

const {categories_repository: CATEGORIES_REPOSITORY} = CATEGORY_CONSTANTS;
const {products_repository: PRODUCTS_REPOSITORY} = PRODUCT_CONSTANTS;
@Injectable()
export class CategoriesService {
  constructor(
    @Inject(CATEGORIES_REPOSITORY)
    private categoryRepository: typeof Category,
    @Inject(PRODUCTS_REPOSITORY)
    private productRepository: typeof Product,
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
    return await this.categoryRepository.findAll({
      include: [Product],
    });
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
    const category = await this.categoryRepository.findByPk(id);
    let changes = false;

    if (!category) {
      throw new NotFoundException(`Category with id '${id}' not found.`);
    }

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
}
