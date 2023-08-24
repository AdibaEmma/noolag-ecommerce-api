import {Module} from '@nestjs/common';
import {ProductsController} from '../controllers/products.controller';
import {ProductsService} from '../services/products.service';
import {ValidationService} from '@app/services/validation.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ValidationService],
})
export class ProductsModule {}
