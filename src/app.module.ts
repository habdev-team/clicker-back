import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BotModule } from './bot/bot.module';
import { UsersModule } from './users/users.module';

import { getMongoConfig } from './config/mongo.config';

@Module({
  imports: [
    MongooseModule.forRootAsync(getMongoConfig()),
    BotModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
