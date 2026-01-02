import { Injectable } from "@nestjs/common";
import { User, UsersRepository } from "./users.service";


@Injectable()
export class UsersRepositoryImpl implements UsersRepository{

    async findAll(): Promise<User[]> {
        return [
             { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
        ]
    }

    async findOne(id:number):Promise<User | null>{
        return { id, name:"john"}
    }
}