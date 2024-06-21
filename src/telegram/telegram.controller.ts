import { Telegraf, Context } from 'telegraf';
import { Ctx, Hears, InjectBot, Update } from 'nestjs-telegraf';

import { TelegramService } from './telegram.service';

import { COMMANDS } from 'common/constants/bot_commands';

@Update()
export class TelegramController {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly telegramService: TelegramService,
  ) {
    this.bot.telegram.setMyCommands(COMMANDS);
  }

  @Hears('/description')
  async description(@Ctx() ctx: Context) {
    await this.telegramService.description(ctx);
  }
}
