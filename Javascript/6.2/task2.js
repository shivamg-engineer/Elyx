// 2. Fetching Data from an API Using Fetch

// Task: Use fetch() to get real-time data from an API.

async function getUser() {
    try{
      let response= await fetch("https://jsonplaceholder.typicode.com/users/1");
      let user= await response.json();
      console.log(response);
    }catch(error){
       console.log("error :",error);
    }
}
getUser();