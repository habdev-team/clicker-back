import { Module } from '@nestjs/common';
import { TgAvatarParserService } from './tg-avatar-parser.service';
import { ConfigurationFileModule } from 'common/error-handling';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigurationFileModule, HttpModule],
  providers: [TgAvatarParserService],
  exports: [TgAvatarParserService],
})
export class TgAvatarParserModule {}
