import '../sentry.init';
import * as Sentry from '@sentry/node';
import {
  BaseExceptionFilter,
  HttpAdapterHost,
  NestFactory,
} from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['https://mine-digs.ru', 'https://dev.mine-digs.ru'],
    credentials: true,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  });

  app.useGlobalPipes(new ValidationPipe());
  const { httpAdapter } = app.get(HttpAdapterHost);
  Sentry.setupNestErrorHandler(app, new BaseExceptionFilter(httpAdapter));
  await app.listen(3000);
}
bootstrap();
