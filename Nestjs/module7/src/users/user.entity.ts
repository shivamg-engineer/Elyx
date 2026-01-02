import { Posts } from '../posts/posts.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('users')
export class Users {

  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({name:"name"})
  name: string;

  // 👇 New column added
  @Column({name:"age", nullable: true })
  age: number;

  @Column({name:"email", unique:true})
  email:string;

  @OneToMany(()=> Posts,(post)=>post.user)
  posts:Posts[]

}
