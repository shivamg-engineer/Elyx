// Write an async function that retries an API request up to three times if it fails.
async function fetchWithRetry(url: string, retries = 3, delay = 1000):Promise<any> {
    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            console.log(`Attempt ${attempt}: Fetching ${url}`);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(" Success:", data);
            return data;
        } catch (error:any) {
            console.error(` Attempt ${attempt} failed: ${error.message}`);
            if (attempt < retries) {
                console.log(`⏳ Retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                console.error(" All retry attempts failed.");
                throw error;
            }
        }
    }
}
fetchWithRetry("https://jsonplaceholder.typicode.com/users/1")
  .then(() => console.log(" Fetch completed"))
  .catch(err => console.error(" Final Error:", err.message));