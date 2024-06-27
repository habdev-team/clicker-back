import { TelegrafModuleAsyncOptions } from 'nestjs-telegraf';

import {
  ConfigurationFileModule,
  ConfigurationFileService,
} from 'common/error-handling';

export const getTelegrafConfig = (): TelegrafModuleAsyncOptions => ({
  imports: [ConfigurationFileModule],
  useFactory: (сonfigurationFileService: ConfigurationFileService) => ({
    token: сonfigurationFileService.envGetOrThrow('TELEGRAM_BOT_TOKEN'),
    launchOptions: {
      polling: false,
      webhook: {
        domain: сonfigurationFileService.envGetOrThrow('SERVER_DOMAIN'),
        path: '/bot',
      },
    },
  }),
  inject: [ConfigurationFileService],
});
