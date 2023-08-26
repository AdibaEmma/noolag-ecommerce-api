import {Module} from '@nestjs/common';
import {ProductsController} from '../controllers/products.controller';
import {ProductsService} from '../services/products.service';
import {ValidationService} from '@app/services/validation.service';
import {DatabaseModule} from './database.module';
import {categoriesProviders, productsProviders} from '@app/providers';
import {CategoriesService} from '@app/services';
import {RedisService} from '@app/services/redis.service';
import {JwtService} from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [ProductsService, ValidationService, CategoriesService, RedisService, JwtService, ...productsProviders, ...categoriesProviders],
})
export class ProductsModule {}
