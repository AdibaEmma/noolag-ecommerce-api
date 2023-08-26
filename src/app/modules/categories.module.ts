import {Module} from '@nestjs/common';
import {CategoriesService} from '../services/categories.service';
import {CategoriesController} from '../controllers/categories.controller';
import {categoriesProviders, productsProviders} from '@app/providers';
import {DatabaseModule} from './database.module';
import {ValidationService} from '@app/services/validation.service';
import {RedisService} from '@app/services/redis.service';
import {JwtService} from '@nestjs/jwt';
import {RolesGuard} from '@app/guards';

@Module({
  imports: [DatabaseModule],
  providers: [CategoriesService, ValidationService, RedisService, JwtService, ...categoriesProviders, ...productsProviders],
  controllers: [CategoriesController],
  exports: [CategoriesService],
})
export class CategoriesModule {}
