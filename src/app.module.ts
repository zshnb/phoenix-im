import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebsocketModule } from './websocket/websocket.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    WebsocketModule,
    MongooseModule.forRoot('mongodb://localhost/im'),
    UserModule,
  ],
})
export class AppModule {}
