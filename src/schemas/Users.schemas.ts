import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { IUser, LanguagesType } from 'lib/interfaces/user.interface';

@Schema()
export class Users implements IUser {
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
}

export const UserSchema = SchemaFactory.createForClass(Users);

// filter to show all users data without _id and __v
UserSchema.set('toJSON', {
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
