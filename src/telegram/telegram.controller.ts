import { Telegraf, Context } from 'telegraf';
import { Ctx, Hears, InjectBot, Start, Update } from 'nestjs-telegraf';

import { TelegramService } from './telegram.service';

import { COMMANDS } from 'common/constants/bot_commands';

@Update()
export class TelegramController {
  constructor(
    private readonly telegramService: TelegramService,
    @InjectBot() private readonly bot: Telegraf<Context>,
  ) {
    this.bot.telegram.setMyCommands(COMMANDS);
  }

  @Start()
  async start(@Ctx() ctx: Context) {
    await this.telegramService.start(ctx);
  }

  @Hears('/description')
  async description(@Ctx() ctx: Context) {
    await this.telegramService.description(ctx);
  }
}
