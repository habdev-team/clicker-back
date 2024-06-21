import { Injectable } from '@nestjs/common';

import { TgAvatar } from './lib/tg-avatar.lib';
import { Response } from 'mongodb/lib/responses.lib';

import { UserRepository } from './users.repository';

import { UserDto } from './dto/User.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly tgAvatar: TgAvatar,
    private readonly repository: UserRepository,
  ) {}

  async findOrCreateUser(userDto: UserDto) {
    // get user's _id, if user exist in database - just return data
    const { _id } = userDto;
    const user = await this.repository.findById({ _id });

    if (user) return Response.usersResponse('User was found!', user);

    // if user new (do not exist in db) get telegram image
    const image = await this.tgAvatar.getUserAvatar(_id);

    // push user to database
    const newUser = await this.repository.create({ ...userDto, image });

    return Response.usersResponse('User was created!', newUser);
  }
}
