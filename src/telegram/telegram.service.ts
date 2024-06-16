import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Context } from 'telegraf';

import { UsersService } from 'mongodb/users/users.service';

@Injectable()
export class TelegramService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  async description(ctx: Context) {
    return ctx.sendMessage('Description will be here');
  }
}
