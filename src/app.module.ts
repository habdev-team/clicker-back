import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BotModule } from './bot/bot.module';

import { UsersModule } from './users/users.module';

import {
  ConfigurationFileModule,
  ConfigurationFileService,
} from 'common/error-handling';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigurationFileModule],
      useFactory: async (
        configurationFileService: ConfigurationFileService,
      ) => ({
        uri: configurationFileService.envGetOrThrow('MONGO_URL'),
      }),
      inject: [ConfigurationFileService],
    }),
    BotModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
