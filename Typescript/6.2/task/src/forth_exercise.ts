import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

let userCache: User[] | null = null;

async function getUsers(): Promise<User[]> {
  if (userCache) {
    console.log('Returning cached users');
    return userCache;
  }

  const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
  userCache = response.data;
  console.log('Fetched users from API');
  return userCache;
}

// Usage
getUsers().then(users => console.log(users));
// Subsequent calls will use cache
getUsers().then(users => console.log(users));
