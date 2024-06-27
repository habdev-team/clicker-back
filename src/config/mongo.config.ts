import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

import {
  ConfigurationFileModule,
  ConfigurationFileService,
} from 'common/error-handling';

export const getMongoConfig = (): MongooseModuleAsyncOptions => ({
  imports: [ConfigurationFileModule],
  useFactory: async (configurationFileService: ConfigurationFileService) => ({
    uri: getMongoString(configurationFileService),
  }),
  inject: [ConfigurationFileService],
});

const getMongoString = (configurationFileService: ConfigurationFileService) =>
  'mongodb://' +
  configurationFileService.envGetOrThrow('MONGO_LOGIN') +
  ':' +
  configurationFileService.envGetOrThrow('MONGO_PASSWORD') +
  '@' +
  configurationFileService.envGetOrThrow('MONGO_HOST') +
  ':' +
  configurationFileService.envGetOrThrow('MONGO_PORT') +
  '/' +
  configurationFileService.envGetOrThrow('MONGO_DATABASE') +
  '?authSource=' +
  configurationFileService.envGetOrThrow('MONGO_AUTHDATABASE');
