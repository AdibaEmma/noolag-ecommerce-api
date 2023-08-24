import { CreateCategoryDto } from '@app/dtos/create-category.dto';
import { Category } from '@app/entities';
import {CategoriesService} from '@app/services';
import {ValidationService} from '@app/services';
import {Body, Controller, Get, Inject, Param, Post, forwardRef} from '@nestjs/common';
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
}
