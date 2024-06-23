import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

import { ConfigurationFileService } from 'common/error-handling';

interface UserImageReponse {
  ok: boolean;
  result: {
    file_id: string;
    file_unique_id: string;
    file_size: number;
    file_path: string;
  };
}

@Injectable()
export class TgAvatarParserService {
  constructor(
    private readonly httpService: HttpService,
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly configurationFileService: ConfigurationFileService,
  ) {}

  async getUserAvatar(_id: number) {
    try {
      const token =
        this.configurationFileService.envGetOrThrow('TELEGRAM_BOT_TOKEN');

      // get file image id
      const images = await this.bot.telegram.getUserProfilePhotos(_id);

      // get end path to image and its name
      const { data } = await this.httpService.axiosRef.get<UserImageReponse>(
        `https://api.telegram.org/bot${token}/getFile?file_id=${images.photos[0][0].file_id}`,
      );

      // return ready link
      return `https://api.telegram.org/file/bot${token}/${data.result.file_path}`;
    } catch (error) {
      throw new HttpException('Credentials Error', HttpStatus.FORBIDDEN);
    }
  }
}
