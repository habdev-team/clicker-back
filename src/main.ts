import '../sentry.init';
import * as Sentry from '@sentry/node';

import {
  NestFactory,
  HttpAdapterHost,
  BaseExceptionFilter,
} from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { Context, Telegraf } from 'telegraf';
import { getBotToken } from 'nestjs-telegraf';

import { AppModule } from './app.module';

import { getCorsConfig } from './config/cors.config';

import { ConfigurationFileService } from 'common/error-handling';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const bot: Telegraf<Context> = app.get(getBotToken());

  const configService = app.get(ConfigurationFileService);
  app.enableCors(getCorsConfig(configService));

  app.use(
    bot.webhookCallback(`${configService.envGetOrThrow('SERVER_DOMAIN')}/bot`),
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
