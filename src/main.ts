import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerDocumentOptions, SwaggerModule} from '@nestjs/swagger';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}));
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Noolag Ecommerce Assessment')
    .setDescription('An nestjs ecommerce assessment project')
    .setVersion('1.0')
    .addTag('products')
    .addTag('categories')
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };

  const document = SwaggerModule.createDocument(app, swaggerConfig, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT || 4000);
  console.log(`Application is running on: ${process.env.PORT}`);
}
bootstrap();
