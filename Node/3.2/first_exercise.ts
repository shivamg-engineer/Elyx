// Implement an async function that fetches user details and their posts from an API in parallel.
// Define types for User and Post
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

// Async function to fetch user details and posts in parallel
async function fetchUserData(userId: number): Promise<{ user: User; posts: Post[] }> {
  try {
    // Run both API calls at the same time
    const [userRes, postsRes] = await Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
    ]);

    // Check if both responses are OK
    if (!userRes.ok || !postsRes.ok) {
      throw new Error("Failed to fetch data from API");
    }

    // Convert to JSON
    const [user, posts] = await Promise.all([
      userRes.json() as Promise<User>,
      postsRes.json() as Promise<Post[]>
    ]);

    return { user, posts };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

// Example usage
(async () => {
  try {
    const data = await fetchUserData(1);
    console.log("User Details:", data.user);
    console.log("User Posts:", data.posts);
  } catch (err) {
    console.error(" Something went wrong:", err);
  }
})();
