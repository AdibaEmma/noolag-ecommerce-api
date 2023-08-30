import {Roles} from '@app/decorators';
import {CreateProductDto} from '@app/dtos/create-product.dto';
import {UpdateProductDto} from '@app/dtos/update-product.dto';
import {Product} from '@app/entities';
import {AuthGuard, RolesGuard} from '@app/guards';
import {ProductsService, ValidationService} from '@app/services';
import {Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards, forwardRef} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('products')
@Controller()
export class ProductsController {
  constructor(
    @Inject(forwardRef(() => ProductsService)) private readonly productsService: ProductsService,
    @Inject(forwardRef(() => ValidationService)) private readonly validationService: ValidationService,
  ) {}

  @Post()
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles('admin')
  @ApiOperation({summary: 'Create Product'})
  @ApiCreatedResponse({description: 'Created successfully', type: Product})
  @ApiResponse({status: 409, description: 'Conflict: Missing Field(s)'})
  @ApiUnprocessableEntityResponse({description: 'Bad Request: Validation Failed'})
  async createProduct(@Body() createProductDto: CreateProductDto) {
    await this.validationService.validateDto<CreateProductDto>(CreateProductDto, createProductDto);
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  @ApiOperation({summary: 'Find All Products'})
  @ApiOkResponse({description: 'Products returned successfully'})
  async findAllProducts(): Promise<Product[]> {
    return this.productsService.findAllProducts();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get Product'})
  @ApiOkResponse({description: 'Product returned successfully'})
  @ApiNotFoundResponse({description: 'Product not found'})
  async findProductById(@Param('id') id: number): Promise<Product> {
    return this.productsService.findProductById(id);
  }

  @Put(':id')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles('admin')
  @ApiOperation({summary: 'Update Product'})
  @ApiOkResponse({description: 'Product updated successfully', type: Product})
  @ApiNotFoundResponse({description: 'Product not found'})
  @ApiForbiddenResponse({description: 'Unauthorized Request'})
  @ApiUnprocessableEntityResponse({description: 'Bad Request'})
  async updateCategory(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    await this.validationService.validateDto<UpdateProductDto>(UpdateProductDto, updateProductDto);
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles('admin')
  @ApiOperation({summary: 'Delete Product'})
  @ApiOkResponse({description: 'Product deleted successfully'})
  @ApiForbiddenResponse({description: 'Unauthorized Request'})
  @ApiNotFoundResponse({description: 'Product not found'})
  async deleteCategory(@Param('id') id: number): Promise<void> {
    await this.productsService.deleteProduct(id);
  }
}
