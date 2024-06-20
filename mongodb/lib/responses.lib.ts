import { Injectable } from '@nestjs/common';

import { Users } from 'mongodb/schemas/Users.schemas';

@Injectable()
export class Response {
  public static usersResponse(message: string, user: Users) {
    return { error: false, message, user };
  }
}
