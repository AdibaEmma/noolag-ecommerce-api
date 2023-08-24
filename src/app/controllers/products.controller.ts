import {CreateProductDto} from '@app/dtos/create-product.dto';
import {Product} from '@app/entities';
import {ProductsService, ValidationService} from '@app/services';
import {Body, Controller, Inject, Post, forwardRef} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags, ApiUnprocessableEntityResponse} from '@nestjs/swagger';

@ApiTags('products')
@Controller()
export class ProductsController {
  constructor(
    @Inject(forwardRef(() => ProductsService)) private readonly productsService: ProductsService,
    @Inject(forwardRef(() => ValidationService)) private readonly validationService: ValidationService,
  ) {}

  @Post()
  @ApiOperation({summary: 'Create Product'})
  @ApiCreatedResponse({description: 'Created successfully', type: Product})
  @ApiResponse({status: 409, description: 'Conflict: Missing Field(s)'})
  @ApiUnprocessableEntityResponse({description: 'Bad Request: Validation Failed'})
  async createProduct(@Body() createProductDto: CreateProductDto) {
    await this.validationService.validateDto<CreateProductDto>(CreateProductDto, createProductDto);
    return this.productsService.createProduct(createProductDto);
  }
}
