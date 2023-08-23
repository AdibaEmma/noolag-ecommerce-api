import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { HomeController } from './app/controllers/home.controller';
import { HomeService } from './app/services/home.service';
import { ProductsModule } from './app/modules/products.module';
import { CategoriesModule } from './app/modules/categories.module';

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
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: 'ecommerce_db',
      models: [],
    }),
    ProductsModule,
    CategoriesModule,
  ],
  controllers: [HomeController],
  providers: [HomeService],
})
export class AppModule {}
