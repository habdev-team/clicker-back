import {
  Post,
  Body,
  HttpCode,
  Controller,
  UseInterceptors,
} from '@nestjs/common';

import { UsersService } from './users.service';

import { ErrorCatcherInterceptor } from 'mongodb/interceptors/error-catcher/error-catcher.interceptor';

import type { UserDto } from './dto/User.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @Post('/find_or_create_user')
  @UseInterceptors(ErrorCatcherInterceptor)
  findOrCreateUser(@Body() userDto: UserDto) {
    return this.usersService.findOrCreateUser(userDto);
  }
}
