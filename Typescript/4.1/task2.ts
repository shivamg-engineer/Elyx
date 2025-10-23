class User {
    private password;
    username: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    validatePassword(input: string): boolean {
        return this.password === input;
    }

    updatePassword(currentPassword: string, newPassword: string) {
        if (this.validatePassword(currentPassword)) {
            this.password = this.password;
            return true;
        } else {
            return false;
        }

    }
}

const user = new User("ronak", "securePass");
console.log(user.validatePassword("securePass"));

const updated = user.updatePassword("securePass", "newSecurePass");
console.log(updated); // true

console.log(user.validatePassword("newSecurePass")); // true

const failedUpdate = user.updatePassword("wrongPass", "hack");
console.log(failedUpdate); // false