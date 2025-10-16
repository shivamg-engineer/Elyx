export interface User{
    id:number;
    name:string;
}

export async function fetchUserFromAPI():Promise<User> {
    return {id:1,name:'John Doe'};
}