// auth.ts
import { findUserByUsername } from './user.ts'; // 👈 value import (runtime)
export function verifyPassword(inputPassword, storedHash) {
    // For demo, let's say hashing is just appending 'hashed_'
    return `hashed_${inputPassword}` === storedHash;
}
export function login(username, password) {
    const user = findUserByUsername(username);
    if (!user)
        return false;
    return verifyPassword(password, user.passwordHash);
}
//# sourceMappingURL=auth.js.map