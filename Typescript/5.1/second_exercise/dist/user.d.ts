export interface User {
    id: number;
    username: string;
    passwordHash: string;
}
export declare function findUserByUsername(username: string): User | undefined;
//# sourceMappingURL=user.d.ts.map