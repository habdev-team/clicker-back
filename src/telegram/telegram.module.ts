import { Module } from '@nestjs/common';

import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';

import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule.forRoot({ envFilePath: '.env' })],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('TELEGRAM_BOT_TOKEN'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [TelegramService, TelegramController],
})
export class TelegramModule {}
