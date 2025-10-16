// user.ts
export interface User {
    id: number;
    username: string;
    passwordHash: string;
}
const users: User[] = [
    { id: 1, username: "alice", passwordHash: "hashed_pw_1" },
    { id: 2, username: "bob", passwordHash: "hashed_pw_2" },
];

export function findUserByUsername(username: string): User | undefined {
    return users.find(user => user.username === username);
}
