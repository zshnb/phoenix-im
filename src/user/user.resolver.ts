import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserModel } from './user.model';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Resolver((of) => UserModel)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query((returns) => [UserModel])
  async users(
    @Args('userName', { type: () => String }) userName: string,
  ): Promise<UserDto[]> {
    const users = await this.userService.findByNameLike(userName);
    return users.map((user) => {
      return {
        id: user.id,
        userName: user.userName,
      };
    });
  }
}
