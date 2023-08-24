import { CategoriesService } from '@app/services';
import {Controller} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('products')
@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  
}
