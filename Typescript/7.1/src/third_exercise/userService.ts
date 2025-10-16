import  {fetchUserFromAPI , User} from "./apiService";

export async function getUser():Promise<string>{
const user:User=    await fetchUserFromAPI();
     return `Hello, ${user.name}!`;
}