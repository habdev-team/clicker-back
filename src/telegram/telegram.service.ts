import { Injectable } from '@nestjs/common';

import { Context } from 'telegraf';

import { UsersService } from 'mongodb/users/users.service';

@Injectable()
export class TelegramService {
  constructor(private readonly usersService: UsersService) {}

  async start(ctx: Context) {
    return ctx.sendMessage('Bot started!');
  }

  async description(ctx: Context) {
    return ctx.sendMessage('Description will be here');
  }
}
