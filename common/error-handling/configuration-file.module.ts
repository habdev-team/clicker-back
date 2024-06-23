import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ConfigurationFileService } from './configuration-file.service';

@Module({
  imports: [ConfigModule.forRoot({ envFilePath: '.env' })],
  providers: [ConfigurationFileService],
  exports: [ConfigurationFileService],
})
export class ConfigurationFileModule {}
