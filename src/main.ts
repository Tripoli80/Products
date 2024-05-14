/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const apiUrl = !process.env?.npm_lifecycle_script.includes('--watch')
    ? process.env?.PROD_API_URL
      ? process.env.PROD_API_URL
      : 'localhost:3000'
    : process.env?.DEV_API_URL
      ? process.env.DEV_API_URL
      : 'localhost:3000';

  const config = new DocumentBuilder()
    .setTitle('Product project')
    .setDescription(
      'API for work with "Product. `Sometime in update (reboting process)`"',
    )
    .addServer(apiUrl)
    .addBearerAuth(
      {
        type: 'http',
        name: 'authorization',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'JWT',
    )
    .setVersion('0.1')
    .addTag('Product')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
