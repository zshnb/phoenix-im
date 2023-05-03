import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from '../schemas/message.schema';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [WebsocketGateway],
})
export class WebsocketModule {}
