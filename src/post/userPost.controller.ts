import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserPostService } from './userPost.service';
import { createUserPostDto } from './userPost.dto';
import { UserPost } from './userPost.entity';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('posts')
export class UserPostController {
  constructor(private userPostService: UserPostService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Body() createPostDto: createUserPostDto,
    @Request() req
  ): Promise<UserPost> {
    return this.userPostService.createPost(createPostDto, req.user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getPosts(@Query('limit') limit: number): Promise<UserPost[]> {
    if (limit && isNaN(limit)) {
      throw new HttpException('Limit param should be a number', HttpStatus.BAD_REQUEST)
    }

    return this.userPostService.findAll(limit);
  }
}
