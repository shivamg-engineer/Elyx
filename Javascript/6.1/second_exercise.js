// Exercise 2: Callback to Promise

// Convert the following callback function into a Promise-based function.

// function fetchData(callback) {
//   setTimeout(() => callback("Data received"), 2000);
// }
// fetchData(console.log);


function fetchData(){
    return new Promise(resolve=>{
        setTimeout(()=>resolve("data received"),2000);
    })
}

fetchData().then(data=>{
    console.log(data);
})