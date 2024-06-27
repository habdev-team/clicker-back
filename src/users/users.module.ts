import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { UserRepository } from './repositories/users.repository';
import { UsersController } from './users.controller';

import { UserSchema, Users } from 'src/schemas/Users.schemas';

import { TgAvatarParserModule } from 'common/tg-avatar-parser';

@Module({
  imports: [
    HttpModule,
    TgAvatarParserModule,
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
