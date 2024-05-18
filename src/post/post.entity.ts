import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string; // maybe json??

  @ManyToOne(() => User, user => user.posts)
  user: User
}