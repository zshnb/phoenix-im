import { Args, Query, Resolver } from '@nestjs/graphql';
import { PrivateChatModel } from '../chat/chat.model';
import { PrivateChatDto } from '../chat/chat.dto';
import { MessageModel } from './message.model';
import { MessageService } from './message.service';

@Resolver((of) => MessageModel)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}
  @Query((returns) => [MessageModel])
  async messages(@Args('chatId') chatId: string) {
    return await this.messageService.findByChatId(chatId);
  }
}
