import { Ctx, InjectBot, Start, Update } from 'nestjs-telegraf';

import { TelegramService } from './telegram.service';

import { COMMANDS } from 'common/constants';

import Context from 'telegraf/typings/context';
import { Telegraf } from 'telegraf/typings/telegraf';

@Update()
export class TelegramController {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly telegramService: TelegramService,
  ) {
    this.bot.telegram.setMyCommands(COMMANDS);
  }

  @Start()
  async startBot(@Ctx() ctx: Context) {
    return await this.telegramService.startBot(ctx);
  }
}
