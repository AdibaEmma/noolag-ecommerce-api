import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Noolag Ecommerce Assessment')
    .setDescription('An nestjs ecommerce assessment project')
    .setVersion('1.0')
    .addTag('products')
    .addTag('categories')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT || 4000);
  console.log(`Application is running on: ${process.env.PORT}`);
}
bootstrap();
