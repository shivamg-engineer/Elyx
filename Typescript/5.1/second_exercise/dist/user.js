const users = [
    { id: 1, username: "alice", passwordHash: "hashed_pw_1" },
    { id: 2, username: "bob", passwordHash: "hashed_pw_2" },
];
export function findUserByUsername(username) {
    return users.find(user => user.username === username);
}
//# sourceMappingURL=user.js.map