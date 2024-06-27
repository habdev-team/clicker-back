import { Injectable } from '@nestjs/common';

import { UserRepository } from './repositories/users.repository';

import { TgAvatarParserService } from 'common/tg-avatar-parser';

import { UserDto } from './dto/User.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UserRepository,
    private readonly tgAvatarParserService: TgAvatarParserService,
  ) {}

  async findOrCreateUser(userDto: UserDto) {
    // get user's _id, if user exist in database - just return data
    const { _id } = userDto;
    const user = await this.repository.findById({ _id });

    if (user) return { error: false, message: 'User was found!', user };

    // if user new (do not exist in db) get telegram image
    const image = await this.tgAvatarParserService.getUserAvatar(_id);

    // push user to database
    const newUser = await this.repository.create({ ...userDto, image });

    return { error: false, message: 'User was created!', user: newUser };
  }
}
