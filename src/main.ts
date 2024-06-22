import '../sentry.init';
import * as Sentry from '@sentry/node';
import {
  NestFactory,
  HttpAdapterHost,
  BaseExceptionFilter,
} from '@nestjs/core';

import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getBotToken } from 'nestjs-telegraf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const bot = app.get(getBotToken());

  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get<string>('PRODUCTION_DOMAINS').split(','),
    credentials: true,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  });

  app.use(
    bot.webhookCallback(`${configService.get<string>('SERVER_DOMAIN')}/bot`),
  );

  app.useGlobalPipes(new ValidationPipe());

  const { httpAdapter } = app.get(HttpAdapterHost);

  Sentry.setupNestErrorHandler(app, new BaseExceptionFilter(httpAdapter));

  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
