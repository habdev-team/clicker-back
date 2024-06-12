import { Module } from '@nestjs/common';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';

import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TelegrafModule.forRoot({ token: process.env.TELEGRAM_BOT_TOKEN }),
  ],
  controllers: [],
  providers: [TelegramService, TelegramController, ConfigService],
})
export class TelegramModule {}
