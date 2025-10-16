// Exercise 2: Fetch API with Error Handling


// Modify the following code to handle network errors properly.
async function fetchData() {
 
  try{
     let response = await fetch("https://api.example.com/data");
  let data = await response.json();
  console.log(data);


  }catch(error){
    console.log("error : ",error);
  }
}
fetchData();
