// Create a UserActivity EventEmitter to track user logins and logouts.

import EventEmitter from "events";

class UserActivity extends EventEmitter {
  login(username: string) {
    console.log(`${username} is logging in...`);
    this.emit("login", username, new Date());
  }

  logout(username: string) {
    console.log(` ${username} is logging out...`);
    this.emit("logout", username, new Date());
  }
}

const userActivity = new UserActivity();

userActivity.on("login", (username, time) => {
  console.log(` User "${username}" logged in at ${time}`);
});
userActivity.on("logout", (username, time) => {
  console.log(` User "${username}" logged out at ${time}`);
});

userActivity.login("shivam");
setTimeout(() => userActivity.logout("shivam"), 2000);
