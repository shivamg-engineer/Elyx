//  Writing Asynchronous Code Without Callback Hell

// Task: Convert a callback-based function into an async/await function.

function getData(callback) {
  setTimeout(() => {
    callback("Data received");
  }, 2000);
}
getData(console.log);

// Using async/await
async function fetchData() {
  return new Promise(resolve => setTimeout(() => resolve("Data received"), 2000));
}
(async () => {
  console.log(await fetchData());
})();