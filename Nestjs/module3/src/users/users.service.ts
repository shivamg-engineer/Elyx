import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService{
    getUsers(){
        return [
            {name:"John Doe", age:30},
            {name:"Jane Smith", age:25}
        ];
    }
}