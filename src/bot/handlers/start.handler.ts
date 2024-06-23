import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class StartHandler {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) {
    this.bot.start(this.start.bind(this));
  }

  private async start(ctx: Context) {
    await ctx.reply('Welcome!');
  }
}
