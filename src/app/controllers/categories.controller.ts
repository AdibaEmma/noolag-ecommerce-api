import { CreateCategoryDto } from '@app/dtos/create-category.dto';
import {CategoriesService} from '@app/services';
import {ValidationService} from '@app/services';
import {Body, Controller, Get, Inject, Post, forwardRef} from '@nestjs/common';
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
  async findAllCategories() {
    return this.categoriesService.findAllCategories();
  }
}
