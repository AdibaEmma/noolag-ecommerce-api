import {CreateCategoryDto} from '@app/dtos/create-category.dto';
import {UpdateCategoryDto} from '@app/dtos/update-category.dto';
import {Category} from '@app/entities';
import {CategoriesService} from '@app/services';
import {ValidationService} from '@app/services';
import {Body, Controller, Delete, Get, Inject, Param, Post, Put, forwardRef} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('products')
@Controller()
export class CategoriesController {
  constructor(
    @Inject(forwardRef(() => CategoriesService)) private readonly categoriesService: CategoriesService,
    @Inject(forwardRef(() => ValidationService)) private readonly validationService: ValidationService,
  ) {}

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    await this.validationService.validateDto<CreateCategoryDto>(CreateCategoryDto, createCategoryDto);
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  async findAllCategories(): Promise<Category[]> {
    return this.categoriesService.findAllCategories();
  }

  @Get(':id')
  async findCategoryById(@Param('id') id: number): Promise<Category> {
    return this.categoriesService.findCategoryById(id);
  }

  @Put(':id')
  async updateCategory(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    await this.validationService.validateDto<UpdateCategoryDto>(UpdateCategoryDto, updateCategoryDto);
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number): Promise<void> {
    await this.categoriesService.deleteCategory(id);
  }
}
