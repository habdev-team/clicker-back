import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { BotService } from './bot.service';
import { BotController } from './bot.controller';

import { Context, Telegraf } from 'telegraf';
import { InjectBot, TelegrafModule } from 'nestjs-telegraf';

import { StartHandler } from './handlers/start.handler';
import { DescriptionHandler } from './handlers/description.handler';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        token: configService.get<string>('TELEGRAM_BOT_TOKEN'),
        launchOptions: {
          polling: false,
          webhook: {
            domain: configService.get<string>('SERVER_DOMAIN'),
            path: '/bot',
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [BotService, StartHandler, DescriptionHandler],
  controllers: [BotController],
})
export class BotModule implements OnModuleInit {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  async onModuleInit() {
    await this.bot.telegram.deleteWebhook();
  }
}
