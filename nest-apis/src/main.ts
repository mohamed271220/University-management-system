import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply global validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Apply global transform interceptor
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(3000);
}

bootstrap();
