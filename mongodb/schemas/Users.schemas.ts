import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import type { LanguagesType } from 'mongodb/types/LanguagesType.type';

@Schema()
export class Users {
  @Prop({ required: true })
  _id: number;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false, default: null })
  teamId?: string;

  @Prop({ required: false, default: 0 })
  userLevel?: number;

  @Prop({ required: false, default: 'ru' })
  language?: LanguagesType;

  @Prop({ required: false, default: true })
  vibration?: boolean;

  @Prop({ required: false, default: false })
  coinAnimation?: boolean;

  @Prop({ required: false, default: 0 })
  referralsCount?: number;
}

export const UserSchema = SchemaFactory.createForClass(Users);
