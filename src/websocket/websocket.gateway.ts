import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatMessage } from "../type/message";

@WebSocketGateway({ cors: true })
export class WebsocketGateway implements OnGatewayConnection {
  private readonly onlineClients: Record<string, Socket>;
  constructor() {
    this.onlineClients = {};
  }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('privateMessage')
  handlePrivateMessage(
    @MessageBody() data: ChatMessage,
    @ConnectedSocket() client: Socket,
  ): ChatMessage {
    console.log(
      `user ${data.senderId} send private message to ${data.receiverId}, content: ${data.content}`,
    );
    const receiver = this.onlineClients[data.receiverId];
    if (receiver) {
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
