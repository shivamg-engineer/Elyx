import axios from 'axios';

interface User{
    id:number;
    name:string;
    email:string
}

async function getUser():Promise<User[]> {
    const response=await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
    return response.data;
}

getUser().then(users => console.log(users));