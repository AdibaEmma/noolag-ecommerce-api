import {PRODUCT_CONSTANTS} from '@app/constants';
import {CreateProductDto} from '@app/dtos/create-product.dto';
import {Product} from '@app/entities';
import {ConflictException, Inject, Injectable} from '@nestjs/common';
import {CategoriesService} from './categories.service';

const {products_repository: PRODUCTS_REPOSITORY} = PRODUCT_CONSTANTS;

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private productRepository: typeof Product,
    private readonly categoriesService: CategoriesService,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    const {categoryId, name, price} = createProductDto;
    const existingProduct = await this.productRepository.findOne({where: {name}});
    await this.categoriesService.findCategoryById(categoryId);

    if (existingProduct) {
      throw new ConflictException(`Product with name '${name}' already exists.`);
    }

    if (price <= 0) {
      throw new Error('price must be greater than zero');
    }

    return await this.productRepository.create(createProductDto);
  }
}
