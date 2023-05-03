import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePrivateChatDto, PrivateChatDto } from './chat.dto';
import { ChatService } from './chat.service';
import { PrivateChatModel } from './chat.model';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from '../schemas/message.schema';
import { Model } from 'mongoose';

@Resolver((of) => PrivateChatModel)
export class ChatResolver {
  constructor(
    private readonly chatService: ChatService,
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}
  @Mutation((returns) => PrivateChatModel)
  async createPrivateChat(
    @Args('createPrivateChatDto') createPrivateChatDto: CreatePrivateChatDto,
  ): Promise<PrivateChatDto> {
    const privateChat = await this.chatService.createPrivateChat(
      createPrivateChatDto,
    );
    return {
      id: privateChat._id.toString(),
      owner: privateChat.owner,
      target: privateChat.target,
    };
  }

  @Query((returns) => [PrivateChatModel])
  async privateChats(
    @Args('ownerUserId') ownerUserId: string,
  ): Promise<PrivateChatDto[]> {
    const chats = await this.chatService.findByOwner(ownerUserId);
    const result = await Promise.all(
      chats.map(async (it) => {
        const lastMessage = await this.messageModel
          .find({
            privateChat: it.id,
          })
          .populate('owner')
          .limit(1)
          .sort({ sendAt: -1 })
          .exec();
        return {
          id: it._id.toString(),
          owner: it.owner,
          target: it.target,
          lastMessage: lastMessage[0]?.content || '',
          lastMessageUserName: lastMessage[0]?.owner?.userName || '',
          lastMessageAt: lastMessage[0]?.sendAt || 0,
        };
      }),
    );
    return result;
  }
}
