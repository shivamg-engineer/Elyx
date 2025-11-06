// Implement a timeout feature in a Promise function.
function fetchDataWithTimeout(url: string, timeout: number): Promise<string> {
    const fakeFetch = new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve(`Fetched data from ${url}`);
        }, 2000); // pretend operation takes 2 seconds
    });

    const timeoutPromise = new Promise<string>((_, reject) => {
        setTimeout(() => reject(new Error('Operation timed out')), timeout);
    });

    // Promise.race resolves/rejects with whichever happens first
    return Promise.race([fakeFetch, timeoutPromise]);
}

// Usage
fetchDataWithTimeout('https://example.com', 1000) // 1s timeout
    .then(data => console.log('Success:', data))
    .catch(err => console.error('Error:', err.message));



// 🔹 How It Works

// fakeFetch simulates the asynchronous operation.

// timer triggers a rejection if the operation exceeds the timeout.

// Promise resolves normally if the operation finishes before the timeout.

// If timeout < operation time → .catch is triggered.

// If timeout > operation time → .then is triggered.