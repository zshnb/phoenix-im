import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.login(createUserDto);
    if (user) {
      return { data: user._id };
    } else {
      return { data: null };
    }
  }
}
