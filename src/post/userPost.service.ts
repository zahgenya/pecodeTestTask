import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPost } from './userPost.entity';
import { Repository } from 'typeorm';
import { createUserPostDto } from './userPost.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class UserPostService {
  constructor(
    @InjectRepository(UserPost) private userPostRepository: Repository<UserPost>
  ) {}

  async createPost(body: createUserPostDto, user: User): Promise<UserPost> {
    try {
      const newUserPost = this.userPostRepository.create({
        ...body,
        user,
      });

      if (!newUserPost) {
        throw new HttpException('Failed to create post', HttpStatus.BAD_REQUEST)
      }

      return await this.userPostRepository.save(newUserPost);
    } catch (err) {
      throw new HttpException(err.message || 'An error has occured', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(limit?: number) {
    try {
    let queryBuilder = this.userPostRepository.createQueryBuilder('userPost');
    queryBuilder = queryBuilder
      .leftJoinAndSelect('userPost.user', 'user')
      .select(['userPost.id', 'userPost.body', 'user.username']);

    if (limit) {
      queryBuilder = queryBuilder.take(limit);
    }

    return await queryBuilder.getMany();
    } catch (err) {
      throw new HttpException(err.message || 'An error has occured', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
