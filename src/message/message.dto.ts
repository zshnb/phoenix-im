import { UserDto } from '../user/user.dto';

export type MessageDto = {
  id: string;
  owner: UserDto;
  target: UserDto;
  sendAt: number;
  content: string;
};
