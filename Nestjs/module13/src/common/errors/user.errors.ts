import { DomainError } from './domain-error';

export class UserNotFoundError extends DomainError {
  readonly name = 'UserNotFoundError';

  constructor(userId: number) {
    super(`User with id ${userId} not found`);
  }
}

export class UserInactiveError extends DomainError {
  readonly name = 'UserInactiveError';

  constructor() {
    super('User is inactive');
  }
}
