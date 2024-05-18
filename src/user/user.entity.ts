import { Post } from "src/post/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  passwordHash: string

  @OneToMany(() => Post, post => post.user)
  posts: Post[]
}