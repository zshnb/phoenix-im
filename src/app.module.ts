import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebsocketModule } from './websocket/websocket.module';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MessageModule } from './message/message.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    UserModule,
    ChatModule,
    WebsocketModule,
    MongooseModule.forRoot('mongodb://localhost/im'),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
    }),
    MessageModule,
  ],
})
export class AppModule {}
