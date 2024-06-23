import { Post, Body, HttpCode, Controller, UseFilters } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

import { UsersService } from './users.service';

import { HttpExceptionFilter } from 'src/exception-filters/http.exception-filters';
import { MongoExceptionFilter } from 'src/exception-filters/mongo.exception-filters';

import { UserDto } from './dto/User.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @Post('/find_or_create_user')
  @ApiOperation({ summary: 'Find or create a user' })
  @ApiResponse({
    status: 200,
    description: 'User was created!',
    type: UserDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ type: UserDto })
  @UseFilters(HttpExceptionFilter, MongoExceptionFilter)
  findOrCreateUser(@Body() userDto: UserDto) {
    return this.usersService.findOrCreateUser(userDto);
  }
}
