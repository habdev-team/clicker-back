import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { UsersController } from './users.controller';

import { UserSchema, Users } from 'src/schemas/Users.schemas';

import { TgAvatar } from './lib/tg-avatar.lib';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, TgAvatar],
  exports: [UsersService],
})
export class UsersModule {}
