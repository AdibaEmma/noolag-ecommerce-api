import {Roles} from '@app/decorators/roles.decorator';
import {CreateCategoryDto} from '@app/dtos/create-category.dto';
import {UpdateCategoryDto} from '@app/dtos/update-category.dto';
import {Category} from '@app/entities';
import {AuthGuard, RolesGuard} from '@app/guards';
import {CategoriesService} from '@app/services';
import {ValidationService} from '@app/services';
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

@ApiTags('categories')
@Controller()
export class CategoriesController {
  constructor(
    @Inject(forwardRef(() => CategoriesService)) private readonly categoriesService: CategoriesService,
    @Inject(forwardRef(() => ValidationService)) private readonly validationService: ValidationService,
  ) {}

  @Post()
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles('admin')
  @ApiOperation({summary: 'Create category'})
  @ApiCreatedResponse({description: 'Created successfully', type: Category})
  @ApiResponse({status: 409, description: 'Conflict: Missing Field(s)'})
  @ApiUnprocessableEntityResponse({description: 'Bad Request: Validation Failed'})
  @ApiForbiddenResponse({description: 'Unauthorized Request'})
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    await this.validationService.validateDto<CreateCategoryDto>(CreateCategoryDto, createCategoryDto);
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Roles('user', 'admin')
  @ApiOperation({summary: 'Find All categories'})
  @ApiOkResponse({description: 'Categories returned successfully'})
  @ApiForbiddenResponse({description: 'Unauthorized Request'})
  async findAllCategories(): Promise<Category[]> {
    return this.categoriesService.findAllCategories();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get category'})
  @ApiOkResponse({description: 'Category returned successfully'})
  @ApiForbiddenResponse({description: 'Unauthorized Request'})
  @ApiNotFoundResponse({description: 'Category not found'})
  async findCategoryById(@Param('id') id: number): Promise<Category> {
    return this.categoriesService.findCategoryById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({summary: 'Update category'})
  @ApiOkResponse({description: 'Category updated successfully'})
  @ApiNotFoundResponse({description: 'Category not found'})
  @ApiForbiddenResponse({description: 'Unauthorized Request'})
  @ApiUnprocessableEntityResponse({description: 'Bad Request'})
  async updateCategory(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    await this.validationService.validateDto<UpdateCategoryDto>(UpdateCategoryDto, updateCategoryDto);
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({summary: 'Delete category'})
  @ApiOkResponse({description: 'Category deleted successfully'})
  @ApiForbiddenResponse({description: 'Unauthorized Request'})
  @ApiNotFoundResponse({description: 'Category not found'})
  async deleteCategory(@Param('id') id: number): Promise<void> {
    await this.categoriesService.deleteCategory(id);
  }
}
