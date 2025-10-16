// auth.ts

import type { User } from './user.ts';             // 👈 type-only import
import { findUserByUsername } from './user.ts';    // 👈 value import (runtime)

export function verifyPassword(inputPassword: string, storedHash: string): boolean {
  // For demo, let's say hashing is just appending 'hashed_'
  return `hashed_${inputPassword}` === storedHash;
}

export function login(username: string, password: string): boolean {
  const user: User | undefined = findUserByUsername(username);
  if (!user) return false;

  return verifyPassword(password, user.passwordHash);
}
