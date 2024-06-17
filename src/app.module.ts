import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TelegramModule } from 'src/telegram/telegram.module';

@Module({
  imports: [TelegramModule, MongooseModule.forRoot(process.env.MONGO_URL)],
  controllers: [],
  providers: [],
})
export class AppModule {}
