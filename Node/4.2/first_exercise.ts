// Exercise 1: Fetch and Display Data

// TODO:
// Make a GET request to fetch a list of posts (/posts).
// Log the title of each post.

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const getPostTitle = async (url: string): Promise<void> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status : ${response.status}`);
    }
    const data: Post[] = await response.json();

    // Log the title of each post
    data.forEach((post: { title: string }) => {
      console.log("title:",post.title);
    });
  } catch (error) {
    console.log(error);
  }
};
getPostTitle('https://jsonplaceholder.typicode.com/posts');
