// Exercise 1: Async/Await Conversion


// Convert the following callback-based function into an async/await function.


// function fetchData(callback) {
//   setTimeout(() => callback("Data Loaded"), 1500);
// }
// fetchData(console.log);




function fetchData() {
 return new Promise(resolve =>{
    setTimeout(()=>resolve("Data Loaded"),1500);
 });
}

async function loadData() {
    const data= await fetchData();
    console.log(data);
}
loadData();