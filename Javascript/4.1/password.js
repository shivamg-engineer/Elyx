class User {
  #password;
  constructor(name, password) {
    this.name = name;
    this.#password = password;
  }
  validatePassword(inputPassword) {
    return this.#password === inputPassword;
  }
}
