import { Injectable } from '@nestjs/common';
import { CreatePrivateChatDto } from './chat.dto';
import { Model } from 'mongoose';
import { PrivateChat } from '../schemas/chat.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(PrivateChat.name)
    private readonly privateChatModel: Model<PrivateChat>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}
  async createPrivateChat(createPrivateChatDto: CreatePrivateChatDto) {
    const owner = await this.userModel
      .findById(createPrivateChatDto.ownerUserId)
      .exec();
    const target = await this.userModel
      .findById(createPrivateChatDto.targetUserId)
      .exec();
    const existPrivateChat = await this.privateChatModel
      .findOne({
        owner: owner._id.toString(),
        target: target._id.toString(),
      })
      .exec();
    if (existPrivateChat) {
      return existPrivateChat;
    } else {
      const privateChat = await this.privateChatModel.create({
        owner,
        target,
      });
      return privateChat.save();
    }
  }

  async findByOwner(ownerUserId: string) {
    const owner = await this.userModel.findById(ownerUserId).exec();
    const chats = await this.privateChatModel
      .find({
        owner,
      })
      .populate('owner')
      .populate('target')
      .exec();
    return chats;
  }
}
