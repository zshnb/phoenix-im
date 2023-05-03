import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatMessage, CreateChatMessage } from "../type/message";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from '../schemas/message.schema';
import { User } from '../schemas/user.schema';

@WebSocketGateway({ cors: true })
export class WebsocketGateway implements OnGatewayConnection {
  private readonly onlineClients: Record<string, Socket>;
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {
    this.onlineClients = {};
  }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('privateMessage')
  async handlePrivateMessage(
    @MessageBody() data: CreateChatMessage,
    @ConnectedSocket() client: Socket,
  ): Promise<CreateChatMessage> {
    const receiver = this.onlineClients[data.receiverId];
    console.log(`payload: ${JSON.stringify(data)}`);
    if (receiver) {
      console.log(
        `user ${data.senderId} send private message to ${data.receiverId}, content: ${data.content}`,
      );
      const message = await this.messageModel.create({
        privateChat: data.chatId,
        type: 'text',
        sessionType: 'private',
        owner: data.senderId,
        target: data.receiverId,
        status: 'unread',
        sendAt: Date.now(),
        content: data.content,
      });
      await message.save();
      receiver.emit('privateMessage', data);
    }
    return data;
  }

  async handleConnection(client: Socket, ...args: any[]) {
    let userId = client.handshake.query.userId;
    if (Array.isArray(userId)) {
      userId = userId[0];
    }
    this.onlineClients[userId] = client;
    console.log(`client ${client.id} connect, userId: ${userId}`);
  }
}
