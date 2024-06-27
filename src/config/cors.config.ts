import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

import { ConfigurationFileService } from 'common/error-handling';

export const getCorsConfig = (
  configService: ConfigurationFileService,
): CorsOptions => ({
  origin: configService.envGetOrThrow('PRODUCTION_DOMAINS').split(','),
  credentials: true,
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
});
