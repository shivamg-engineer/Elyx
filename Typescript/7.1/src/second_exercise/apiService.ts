export interface User {
  id: number;
  name: string;
}

export async function getUser(): Promise<User> {
  const response = await fetch('https://example.com/user');
  const data = await response.json();
  return data;
}
