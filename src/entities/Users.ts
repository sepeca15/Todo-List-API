import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany, 
  BaseEntity, JoinTable
} from 'typeorm';

import {Todos} from "./Todo"

@Entity()
export class Users extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  user_name: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Todos, todos => todos.id)
    todos: Todos[];

}