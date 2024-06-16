import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsNumber()
  _id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
