// Exercise 1: Implement a Retry Mechanism

// TODO: Implement a function that retries an API request 3 times before failing.

const fetchData1 = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() > 0.5;
            if (success) {
                resolve("Data fetched successfully");
            } else {
                reject("Failed to fetch data");
            }
        }, 1000)
    })
}

const retry = async<T>(fn: () => Promise<T>, retries: number): Promise<T> => {
    let attempt = 0;
    while (attempt <= retries) {
        try {

            const result = await fn();
            console.log(` Success on attempt ${attempt + 1}`);
            return result;
        } catch (error) {
            attempt++;
            console.warn(`Attempt ${attempt} failed`);

            if (attempt > retries) {
                throw new Error(`All ${retries + 1} attempts failed: ${error}`);
            }
        }
    }
    // This will never be reached, but satisfies TypeScript
    throw new Error("Unexpected error in retry function");
}

const fetchDataWithRetry = async () => {
    try {
        const result = await retry(fetchData1, 2);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

fetchDataWithRetry();