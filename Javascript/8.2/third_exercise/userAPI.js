export async function fetchUser(){
    const response=await fetch(`https://jsonplaceholder.typicode.com/users/1`);
    const user=await response.json();
    return user;
}