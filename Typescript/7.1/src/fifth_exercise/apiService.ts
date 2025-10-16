export async function fetchUser(shouldFail = false): Promise<{ id: number; name: string }> {
  if (shouldFail) {
    throw new Error('Failed to fetch user');
  }
  return { id: 1, name: 'John Doe' };
}