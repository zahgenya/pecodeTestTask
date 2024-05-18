import { Injectable } from '@nestjs/common';
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
    const newUserPost = this.userPostRepository.create({
      ...body,
      user,
    });
    return this.userPostRepository.save(newUserPost);
  }

  async findAll(limit?: number) {
    let queryBuilder = this.userPostRepository.createQueryBuilder('userPost');
    queryBuilder = queryBuilder
      .leftJoinAndSelect('userPost.user', 'user')
      .select(['userPost.id', 'userPost.body', 'user.username']);

    if (limit) {
      queryBuilder = queryBuilder.take(limit);
    }

    return await queryBuilder.getMany();
  }
}
