import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async login(createUserDto: CreateUserDto) {
    const existUser = await this.userModel
      .findOne({
        userName: createUserDto.userName,
      })
      .exec();
    if (existUser) {
      if (existUser.password === createUserDto.password) {
        return existUser;
      } else {
        return null;
      }
    } else {
      const user = await this.userModel.create(createUserDto);
      return await user.save();
    }
  }

  async findByNameLike(userName: string) {
    return await this.userModel
      .find({
        userName: { $regex: `.*${userName}.*` },
      })
      .exec();
  }
}
