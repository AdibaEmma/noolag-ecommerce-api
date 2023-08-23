import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app/controllers/app.controller';
import { AppService } from './app/services/app.service';
import { ProductsModule } from './app/modules/products.module';

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
      dialect: 'postgres', // Change this to match your database
      host: 'localhost',
      port: 5432,
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: 'ecommerce_db',
      models: [],
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
