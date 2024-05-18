import { UserPost } from 'src/post/userPost.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  passwordHash: string;

  @OneToMany(() => UserPost, (userPost) => userPost.user)
  userPosts: UserPost[];
}
