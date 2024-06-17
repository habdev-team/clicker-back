import { Module } from '@nestjs/common';

import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';

import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from 'mongodb/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TelegrafModule.forRoot({ token: process.env.TELEGRAM_BOT_TOKEN }),
    UsersModule,
  ],
  controllers: [],
  providers: [TelegramService, TelegramController, ConfigService],
})
export class TelegramModule {}
