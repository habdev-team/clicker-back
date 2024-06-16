import { Injectable } from '@nestjs/common';

import { Users } from 'mongodb/schemas/Users.schemas';

@Injectable()
export class Reponses {
  public static usersReponse(message: string, user: Users) {
    return { message, user };
  }
}
