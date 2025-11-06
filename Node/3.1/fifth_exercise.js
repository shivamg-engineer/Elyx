// Implement a timeout feature in a Promise function.
function fetchDataWithTimeout(url, timeout) {
    var fakeFetch = new Promise(function (resolve) {
        setTimeout(function () {
            resolve("Fetched data from ".concat(url));
        }, 2000); // pretend operation takes 2 seconds
    });
    var timeoutPromise = new Promise(function (_, reject) {
        setTimeout(function () { return reject(new Error('Operation timed out')); }, timeout);
    });
    // Promise.race resolves/rejects with whichever happens first
    return Promise.race([fakeFetch, timeoutPromise]);
}
// Usage
fetchDataWithTimeout('https://example.com', 1000) // 1s timeout
    .then(function (data) { return console.log('Success:', data); })
    .catch(function (err) { return console.error('Error:', err.message); });
// 🔹 How It Works
// fakeFetch simulates the asynchronous operation.
// timer triggers a rejection if the operation exceeds the timeout.
// Promise resolves normally if the operation finishes before the timeout.
// If timeout < operation time → .catch is triggered.
// If timeout > operation time → .then is triggered.
