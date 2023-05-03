import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePrivateChatDto, PrivateChatDto } from './chat.dto';
import { ChatService } from './chat.service';
import { PrivateChatModel } from './chat.model';

@Resolver((of) => PrivateChatModel)
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}
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
    return chats.map((it) => {
      return {
        id: it._id.toString(),
        owner: it.owner,
        target: it.target,
      };
    });
  }
}
