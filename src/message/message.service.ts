import { Injectable } from '@nestjs/common';
import { Message } from '../schemas/message.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}
  async findByChatId(chatId: string) {
    const messages = await this.messageModel
      .find({
        privateChat: chatId,
      })
      .sort({ sendAt: 1 })
      .populate('privateChat')
      .populate('target')
      .populate('owner')
      .exec();
    return messages;
  }
}
