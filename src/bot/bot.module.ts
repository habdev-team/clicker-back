import { Module, OnModuleInit } from '@nestjs/common';

import { BotService } from './bot.service';
import { BotController } from './bot.controller';

import { Context, Telegraf } from 'telegraf';
import { InjectBot, TelegrafModule } from 'nestjs-telegraf';

import { StartHandler } from './handlers/start.handler';
import { DescriptionHandler } from './handlers/description.handler';

import { getTelegrafConfig } from 'src/config/telegraf.config';

@Module({
  imports: [TelegrafModule.forRootAsync(getTelegrafConfig())],
  providers: [BotService, StartHandler, DescriptionHandler],
  controllers: [BotController],
})
export class BotModule implements OnModuleInit {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  async onModuleInit() {
    await this.bot.telegram.deleteWebhook();
  }
}
