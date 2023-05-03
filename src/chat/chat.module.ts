import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PrivateChat, PrivateChatSchema } from '../schemas/chat.schema';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { User, UserSchema } from '../schemas/user.schema';
import { Message, MessageSchema } from '../schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PrivateChat.name, schema: PrivateChatSchema },
      { name: User.name, schema: UserSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  providers: [ChatService, ChatResolver],
})
export class ChatModule {}
