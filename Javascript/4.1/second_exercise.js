class User {
    #name;
    #email;
     constructor(name, email) {
    this.name = name;   
    this.email = email;
  }

    getName() {
        return this.#name;
    }
    setName(name) {
        if (!name || name.trim() === "") {
            throw new Error("Name cannot be empty");
        }
        this.#name = name;
    }
    getEmail() {
        return this.#email;
    }
    set email(value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      throw new Error("Invalid email format");
    }
    this.#email = value;
  }

}

const user = new User("Alice", "alice@example.com");
user.name = ""; // Should not allow setting an empty name
user.email = "invalid-email"; // Should not allow an incorrect email format
console.log(user);