// main.ts
import { login } from "./auth.ts";
const username = "alice";
const password = "pw_1";
if (login(username, password)) {
    console.log("Login successful!");
}
else {
    console.log("Login failed.");
}
//# sourceMappingURL=main.js.map