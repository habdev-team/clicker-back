import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Users } from 'src/schemas/Users.schemas';

import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<Users>,
  ) {}

  async create(user: Users): Promise<Users> {
    return this.userModel.create(user);
  }

  async findById(userFilterQuery: FilterQuery<Users>): Promise<Users> {
    return this.userModel.findById(userFilterQuery).exec();
  }
}
