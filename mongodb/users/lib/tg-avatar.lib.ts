import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

import type { UserImageReponse } from 'mongodb/types/UserImageReponse.interface';

@Injectable()
export class TgAvatar {
  constructor(
    private readonly httpService: HttpService,
    @InjectBot() private readonly bot: Telegraf<Context>,
  ) {}

  public async getUserAvatar(_id: number) {
    try {
      // get file image id
      const images = await this.bot.telegram.getUserProfilePhotos(_id);

      // get end path to image and its name
      const { data } = await this.httpService.axiosRef.get<UserImageReponse>(
        `https://api.telegram.org/bot/${process.env.TELEGRAM_BOT_TOKEN}/getFile?file_id=${images.photos[0][0].file_id}`,
      );

      // return ready link
      return `https://api.telegram.org/file/bot/${process.env.TELEGRAM_BOT_TOKEN}/${data.result.file_path}`;
    } catch (error) {
      throw new HttpException('Credentials Error', HttpStatus.FORBIDDEN);
    }
  }
}
