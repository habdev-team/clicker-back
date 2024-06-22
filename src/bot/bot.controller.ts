import { Controller, Post, Req } from '@nestjs/common';

import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Controller('bot')
export class BotController {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {}

  @Post()
  async handleUpdate(@Req() req) {
    await this.bot.handleUpdate(req.body);
  }
}
