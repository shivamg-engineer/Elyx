// Optimize an API request function by introducing a timeout mechanism.

async function fetchWithTimeout(
    url: string,
    timeout: number = 5000
): Promise<any> {

    // Create a controller to cancel the fetch if it times out
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        console.log(`🌐 Fetching ${url} (timeout: ${timeout}ms)`);
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Success:", data);
        return data;
    } catch (error: any) {
        if (error.name === "AbortError") {
            console.error("⏱️ Request timed out!");
            throw new Error("Request timed out");
        } else {
            console.error("❌ Fetch failed:", error.message);
            throw error;
        }

    } finally {
        clearTimeout(timeoutId);
    }

}

// Example usage
fetchWithTimeout("https://jsonplaceholder.typicode.com/users/1", 3000)
  .then(() => console.log("🎉 Request finished"))
  .catch(err => console.error("💥 Error:", err.message));