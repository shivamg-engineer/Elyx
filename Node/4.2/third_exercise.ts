// Exercise 3: Error Handling for Failed Requests

// TODO:
// Modify an endpoint to simulate an API failure.
// Implement a fallback mechanism to retry the request.

const fetchWithRetry = async (
  url: string,
  retries:number = 3,
  delay: number = 1000 // ms
): Promise<any> => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.warn(`Attempt ${attempt} failed:`, error);
      if (attempt < retries) {
        console.log(`Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        throw new Error(`Failed after ${retries} attempts: ${error}`);
      }
    }
  }
};
const testUrl = "https://jsonplaceholder.typicode.com/invalid-endpoint"; // 404 endpoint

fetchWithRetry(testUrl, 3, 2000)
  .then((data) => console.log("Data received:", data))
  .catch((error) => console.error("All attempts failed:", error.message));
