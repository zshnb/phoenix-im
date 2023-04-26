import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket/websocket.gateway';

@Module({
  imports: [WebsocketGateway],
})
export class AppModule {}
