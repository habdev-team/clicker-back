export type LanguagesType = 'ru' | 'eng';

export interface IUser {
  _id: number;
  image: string;
  name: string;
  teamId?: string;
  userLevel?: number;
  language?: LanguagesType;
  vibration?: boolean;
}
