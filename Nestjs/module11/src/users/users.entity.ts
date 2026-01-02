import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

}
