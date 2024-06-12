import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Context, Markup } from 'telegraf';

@Injectable()
export class TelegramService {
  constructor(private readonly configService: ConfigService) {}

  public async startBot(ctx: Context) {
    const { first_name } = ctx.from;

    const inlineKeyboard = Markup.inlineKeyboard([
      [
        Markup.button.webApp(
          'Start play!',
          this.configService.get('TELEGRAM_MINI_APP_LINK'),
        ),
      ],
    ]);

    return await ctx.sendMessage(`Hello, ${first_name}!`, inlineKeyboard);
  }
}
