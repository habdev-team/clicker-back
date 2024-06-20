import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({ example: '1', description: 'The id of the user' })
  @IsNotEmpty()
  @IsNumber()
  _id: number;

  @ApiProperty({ example: 'player', description: 'The name of the user' })
  @IsNotEmpty()
  @IsString()
  name: string;
}
