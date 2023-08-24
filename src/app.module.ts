import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {HomeController} from './app/controllers/home.controller';
import {HomeService} from './app/services/home.service';
import {ProductsModule} from './app/modules/products.module';
import {CategoriesModule} from './app/modules/categories.module';
import {RoutingModule} from '@app/modules/routing.module';
import {DatabaseModule} from '@app/modules/database.module';

let envFile: string;
if (process.env.NODE_ENV === 'development') {
  envFile = '.env';
}

if (process.env.NODE_ENV === 'production') {
  envFile = '.env.production';
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: envFile,
      isGlobal: true,
    }),
    DatabaseModule,
    ProductsModule,
    CategoriesModule,
    RoutingModule,
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class AppModule {}
