import axios from 'axios';
interface User {
    id: number;
    name: string;
    email: string;
}

async function fetchData<T>(url: string, useAxios: boolean = false): Promise<T> {
    const response = await fetch(url);

    if (useAxios) {
        const {data}=await axios.get<T>(url);
        return data;
    } else {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    }

}
fetchData<User[]>('https://jsonplaceholder.typicode.com/users')
  .then(users => console.log('Fetch Result:', users))
  .catch(error => console.error('Fetch Error:', error));