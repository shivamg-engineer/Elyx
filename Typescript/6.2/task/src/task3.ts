import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}


async function getUsersWithAxios(): Promise<User[]> {
const { data } = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
return data;
}
getUsersWithAxios().then(users => console.log(users));