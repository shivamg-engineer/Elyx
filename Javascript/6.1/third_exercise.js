// Exercise 3: Handling Errors with Promises

// Modify the following function to correctly handle errors using .catch().

function fetchUserData() {
  return new Promise((resolve, reject) => {
    let success = Math.random() > 0.5;
    setTimeout(() => (success ? resolve("User Data") : reject("Error fetching data")), 2000);
  });
}
fetchUserData()
  .then(console.log).catch(error=>{
    console.log("Failed",error);
  });
