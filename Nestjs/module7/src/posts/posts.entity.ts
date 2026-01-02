import { Users } from '../users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('posts')
export class Posts {
  @PrimaryGeneratedColumn({name:"post_id"})
  id: number;

  @Column({name:"title"})
  title: string;

  @Column({name:"content"})
  content: string;

  @ManyToOne(() => Users, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: Users;
}
