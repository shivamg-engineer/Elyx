interface User {
  id: number;
  name: string;
  email: string;
}

async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {

      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: User[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return [];
  }
}

getUsers().then(users => console.log(users));
