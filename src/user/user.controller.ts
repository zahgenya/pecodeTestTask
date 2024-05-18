import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Request() req) {
    const { username, email } = req.user;
    return { username, email };
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  async getUserById(@Param('userId') userId: number) {
    console.log(userId);
    return this.userService.findById(userId);
  }

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
