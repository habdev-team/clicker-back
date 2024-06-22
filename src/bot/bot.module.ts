import { Module, OnModuleInit } from '@nestjs/common';

import { BotService } from './bot.service';
import { BotController } from './bot.controller';

import { Context, Telegraf } from 'telegraf';
import { InjectBot, TelegrafModule } from 'nestjs-telegraf';

import { StartHandler } from './handlers/start.handler';
import { DescriptionHandler } from './handlers/description.handler';

import {
  ConfigurationFileModule,
  ConfigurationFileService,
} from 'common/error-handling';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [ConfigurationFileModule],
      useFactory: (сonfigurationFileService: ConfigurationFileService) => ({
        token: сonfigurationFileService.envGetOrThrow('TELEGRAM_BOT_TOKEN'),
        launchOptions: {
          polling: false,
          webhook: {
            domain: сonfigurationFileService.envGetOrThrow('SERVER_DOMAIN'),
            path: '/bot',
          },
        },
      }),
      inject: [ConfigurationFileService],
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
