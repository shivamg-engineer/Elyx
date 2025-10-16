import axios from 'axios';

interface User {
  id?: number;  // Optional because when creating, the ID might not be set yet
  name: string;
  email: string;
}

async function createUser(user:Omit<User,'id'>):Promise<User> {
const response = await axios.post<User>('https://jsonplaceholder.typicode.com/users', user);
return response.data;

}


const newUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
};
createUser(newUser)
  .then(createdUser => console.log('Created User:', createdUser))
  .catch(error => console.error('Error creating user:', error));