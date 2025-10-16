import { fetchUser } from "./userAPI.js";

async function main() {
    const user = await fetchUser();
    const { name, email } = user;
    console.log(name, email);
}

main();