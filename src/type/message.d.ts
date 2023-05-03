import { UserDto } from '../user/user.dto';

export type ChatMessage = {
  chatId: string;
  from: MessageFrom;
  sender: UserDto;
  receiver: UserDto;
  content: string;
  sendAt: string;
};

export type CreateChatMessage = {
  chatId: string;
  from: MessageFrom;
  senderId: string;
  receiverId: string;
  content: string;
};
