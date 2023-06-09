import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from '../user/user.model';

@ObjectType()
export class PrivateChatModel {
  @Field()
  id: string;
  @Field()
  owner: UserModel;
  @Field()
  target: UserModel;
  @Field()
  lastMessage: string;
  @Field()
  lastMessageUserName: string;
  @Field()
  lastMessageAt: number;
}
