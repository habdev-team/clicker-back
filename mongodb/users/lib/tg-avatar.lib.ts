import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

import { Context, Telegraf } from 'telegraf';

import type { UserImageReponse } from 'mongodb/types/UserImageReponse.interface';

@Injectable()
export class TgAvatar {
  public static async getUserAvatar(
    _id: number,
    bot: Telegraf<Context>,
    httpService: HttpService,
  ) {
    // get file image id
    const images = await bot.telegram.getUserProfilePhotos(_id);

    // get end path to image and its name
    const { data } = await httpService.axiosRef.get<UserImageReponse>(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getFile?file_id=${images.photos[0][0].file_id}`,
    );

    // return ready link
    return `https://api.telegram.org/file/bot${process.env.TELEGRAM_BOT_TOKEN}/${data.result.file_path}`;
  }
}
