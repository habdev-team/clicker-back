import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Users } from 'mongodb/schemas/Users.schemas';

import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

import { TgAvatar } from './lib/tg-avatar.lib';
import { Reponses } from 'mongodb/lib/responses.lib';

import type { UserDto } from './dto/User.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly httpService: HttpService,
    @InjectBot() private readonly bot: Telegraf<Context>,
    @InjectModel(Users.name) private readonly userModel: Model<Users>,
  ) {}

  async findOrCreateUser(userDto: UserDto) {
    const { _id } = userDto;
    const user = await this.userModel.findById({ _id }, { _id: 0, __v: 0 });

    if (user) return Reponses.usersReponse('User was found!', user);

    const image = await TgAvatar.getUserAvatar(_id, this.bot, this.httpService);

    const newUser = await new this.userModel(
      { ...userDto, image },
      { _id: 0, __v: 0 },
    ).save();

    return Reponses.usersReponse('User was created!', newUser);
  }
}
