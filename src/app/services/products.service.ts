import {PRODUCT_CONSTANTS} from '@app/constants';
import {CreateProductDto} from '@app/dtos/create-product.dto';
import {Product} from '@app/entities';
import {ConflictException, Inject, Injectable, MethodNotAllowedException, NotFoundException} from '@nestjs/common';
import {CategoriesService} from './categories.service';
import { UpdateProductDto } from '@app/dtos/update-product.dto';

const {products_repository: PRODUCTS_REPOSITORY} = PRODUCT_CONSTANTS;

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCTS_REPOSITORY)
    private productRepository: typeof Product,
    private readonly categoriesService: CategoriesService,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
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

  async findAllProducts(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async findProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findByPk(id);

    if (!product) {
      throw new NotFoundException(`Product with id '${id}' not found.`);
    }

    return product;
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const {name, description, price, categoryId} = updateProductDto;
    let changes = false;

    const product = await this.findProductById(id);

    if (name.length >= 3 && product.name != name) {
      product.name = name;
      changes = true;
    }

    if (description.length > 0 && product.description != description) {
      product.description = description;
      changes = true;
    }

    if (price != null && price > 0 && product.price != price) {
      product.price = price;
      changes = true;
    }

    if (product.categoryId != categoryId) {
      const category = await this.categoriesService.findCategoryById(categoryId);
      if (category) {
        product.categoryId = categoryId;
      }
    }
    if (!changes) {
      throw new MethodNotAllowedException('Could not perform update');
    }
    await product.save();
    return product;
  }

  async deleteProduct(id: number): Promise<void> {
    const product = await this.findProductById(id);

    await product.destroy();
  }
}
