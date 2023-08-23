import { Module } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CategoriesController } from '../controllers/categories.controller';
import { categoriesProviders, productsProviders } from '@app/providers';
import { DatabaseModule } from './database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CategoriesService, ...categoriesProviders, ...productsProviders],
  controllers: [CategoriesController],
  exports: [CategoriesService],
})
export class CategoriesModule {}
