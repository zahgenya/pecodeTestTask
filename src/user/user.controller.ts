import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUser(
    @Body('password') password: string,
    @Body('username') username: string,
    @Body('email') email: string
  ): Promise<User> {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const res = await this.userService.createUser(
      username,
      email,
      passwordHash
    );
    return res;
  }
}
