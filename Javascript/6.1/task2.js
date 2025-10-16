function delayedMessage(message, delay, callback) {
  setTimeout(() => {
    console.log(message);
    callback();
  }, delay);
}
delayedMessage("Hello!", 2000, () => console.log("Callback executed"));

// function showMessage(msg, delay, next) {
//   setTimeout(() => {
//     console.log(msg);
//     next();
//   }, delay);
// }

// showMessage("Hi", 1000, () => console.log("First step done"));
// showMessage("Wait for it...", 2000, () => console.log("Next step"));
