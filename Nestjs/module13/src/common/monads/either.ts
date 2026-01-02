// src/common/monads/either.ts

export type Either<L, R> = Left<L> | Right<R>;

// export class Left<L> {
//   readonly type = 'left';
//   constructor(public readonly value: L) {}
// }

// export class Right<R> {
//   readonly type = 'right';
//   constructor(public readonly value: R) {}
// }

export class Left<L> {
  readonly isLeft = true;
  readonly isRight = false;

  constructor(public readonly value: L) {}

  map<U>(_fn: (r: never) => U): Either<L, U> {
    return this;
  }

  mapLeft<U>(fn: (l: L) => U): Either<U, never> {
    return new Left(fn(this.value));
  }
}
export class Right<R> {
  readonly isLeft = false;
  readonly isRight = true;

  constructor(public readonly value: R) {}

  map<U>(fn: (r: R) => U): Either<never, U> {
    return new Right(fn(this.value));
  }

  mapLeft<_U>(_fn: (l: never) => _U): Either<_U, R> {
    return this;
  }
}

/* ---------- Factory helpers ---------- */

export const left = <L>(value: L): Either<L, never> =>
  new Left(value);

export const right = <R>(value: R): Either<never, R> =>
  new Right(value);
