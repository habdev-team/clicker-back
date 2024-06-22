import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationFileService {
  private readonly logger: Logger;

  constructor(private readonly configService: ConfigService) {
    this.logger = new Logger();
  }

  envGetOrThrow(key: string) {
    try {
      return this.configService.getOrThrow<string>(key);
    } catch (error) {
      this.logger.error(`Configuration value ${key} does not exist!`);
      process.exit(1);
    }
  }
}
