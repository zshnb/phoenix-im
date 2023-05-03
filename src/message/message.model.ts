import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from '../user/user.model';
import { PrivateChatModel } from '../chat/chat.model';

@ObjectType()
export class MessageModel {
  @Field()
  id: string;
  @Field()
  owner: UserModel;
  @Field()
  target: UserModel;
  @Field()
  sendAt: number;
  @Field()
  content: string;
  @Field()
  privateChat: PrivateChatModel;
}
