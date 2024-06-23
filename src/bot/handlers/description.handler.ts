import { Injectable } from '@nestjs/common';

import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class DescriptionHandler {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {
    this.bot.hears('/description', this.descriptionHandler.bind(this));
  }

  private async descriptionHandler(ctx: Context) {
    await ctx.reply('Here is the description');
  }
}
