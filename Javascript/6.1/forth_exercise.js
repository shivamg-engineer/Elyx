// Exercise 4: Writing a Delay Function

// Implement a wait(ms) function using both a callback and a Promise.

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
wait(2000).then(() => console.log("waited for 2 seconds (Promise)"));



function waitWithCallback(ms, callback) {
    setTimeout(callback, ms);
}
waitWithCallback(2000, () => console.log("waited for 2 seconds (Callback)"));