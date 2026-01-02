import { Injectable } from '@nestjs/common';
// import { Result, success, failure } from 'src/common/monads';
import { Result, ok, err, ResultStatic } from 'src/common/monads';
import {
  UserInactiveError,
  UserNotFoundError,
} from 'src/common/errors/user.errors';
import { DomainError } from 'src/common/errors/domain-error';

// type User = {
//   id: number;
//   name: string;
// };
type User = {
  id: number;
  name: string;
  isActive: boolean;
};
@Injectable()
export class UsersService {
  private users = [{ id: 1, name: 'Shivam', isActive: true }];

  // getUserById(
  //   id: number,
  // ): Result<{ id: number; name: string }, UserNotFoundError> {
  //   const user = this.users.find((u) => u.id === id);

  //   // if (!user) {
  //   //   return failure('User not found');
  //   // }

  //   // return success(user);
  //   //  if (!user) {
  //   //   return ResultStatic.err('User not found');
  //   // }

  //   //using Custome error
  //   if (!user) {
  //     return err(new UserNotFoundError(id));
  //   }

  //   return ResultStatic.ok(user);
  // }
  getUserById(id: number): Result<User, DomainError> {
    return this.findUser(id).flatMap((user) => this.validateUser(user));
  }

  private findUser(id: number): Result<User, UserNotFoundError> {
    const user = this.users.find((u) => u.id === id);
    return user ? ok(user) : err(new UserNotFoundError(id));
  }

  private validateUser(user: User): Result<User, UserInactiveError> {
    return user.isActive ? ok(user) : err(new UserInactiveError());
  }
}
