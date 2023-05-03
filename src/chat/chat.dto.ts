import { Field, InputType } from '@nestjs/graphql';
import { UserDto } from '../user/user.dto';

@InputType()
export class CreatePrivateChatDto {
  @Field()
  ownerUserId: string;
  @Field()
  targetUserId: string;
}

export type PrivateChatDto = {
  id: string;
  owner: UserDto;
  target: UserDto;
};
