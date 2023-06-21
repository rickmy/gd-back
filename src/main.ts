import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    logger: ['error', 'warn', 'log'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('/api');
  const config = new DocumentBuilder()
    .setTitle('Api Rest Complexivo')
    .setDescription('The NestJS Prisma API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors({
    origin: '*',
  });
  await app.listen(3000);
}
bootstrap();
