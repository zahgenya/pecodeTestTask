import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPost } from './userPost.entity';
import { UserPostController } from './userPost.controller';
import { UserPostService } from './userPost.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserPost]), AuthModule],
  controllers: [UserPostController],
  providers: [UserPostService],
})
export class UserPostModule {}
