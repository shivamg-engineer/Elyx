function fetchWithTimeout(
  resource: RequestInfo,
  options: RequestInit & { timeout?: number } = {}
): Promise<Response> {
  const { timeout = 8000, ...fetchOptions } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  console.log(`id:${id}`);

  return fetch(resource, {
    ...fetchOptions,
    signal: controller.signal,
  }).finally(() => clearTimeout(id));
}

interface User {
  id: number;
  name: string;
  email: string;
}

async function getUsers(): Promise<User[]> {
  try {
    const response = await fetchWithTimeout('https://jsonplaceholder.typicode.com/users', { timeout: 5000 });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: User[] = await response.json();
    return data;

  } catch (error: unknown) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.error('Request timed out while fetching users.');
    } else {
      console.error('Failed to fetch users:', error);
    }
    return [];
  }
}

getUsers().then(users => console.log(users));
