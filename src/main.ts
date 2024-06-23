import '../sentry.init';
import * as Sentry from '@sentry/node';
import {
  NestFactory,
  HttpAdapterHost,
  BaseExceptionFilter,
} from '@nestjs/core';

import { AppModule } from './app.module';

import { getBotToken } from 'nestjs-telegraf';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ConfigurationFileService } from 'common/error-handling';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const bot = app.get(getBotToken());

  const configService = app.get(ConfigurationFileService);

  app.enableCors({
    origin: configService.envGetOrThrow('PRODUCTION_DOMAINS').split(','),
    credentials: true,
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  });

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
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3001);
}
bootstrap();
