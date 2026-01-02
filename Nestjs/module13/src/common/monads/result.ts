export type Result<T, E> = Ok<T> | Err<E>;

export class Ok<T> {
  readonly type = 'ok';
  constructor(public readonly value: T) {}

  /* ---------- State Checks ---------- */
  // isOk(): this is Ok<T> {
  //   return this.type === 'ok';
  // }

  // isErr(): this is never {
  //   return false;
  // }

  // /* ---------- Safe Access ---------- */
  // getValue(): T {
  //   return this.value;
  // }

  // getError(): never {
  //   throw new Error('Cannot get error from Ok result');
  // }

  map<U>(fn: (value: T) => U): Result<U, never> {
    return new Ok(fn(this.value));
  }
  mapError<F>(_fn: (error: never) => F): Result<T, F> {
    return this;
  }
  flatMap<U, F>(fn: (value: T) => Result<U, F>): Result<U, F> {
    return fn(this.value);
  }
}

export class Err<E> {
  readonly type = 'err';
  constructor(public readonly error: E) {}

  /* ---------- State Checks ---------- */
  // isOk(): this is never {
  //   return false;
  // }

  // isErr(): this is Err<E> {
  //   return this.type === 'err';
  // }

  // /* ---------- Safe Access ---------- */
  // getValue(): never {
  //   throw new Error('Cannot get value from Err result');
  // }

  // getError(): E {
  //   return this.error;
  // }
   map<U>(_fn: (value: never) => U): Result<U, E> {
    return this;
  }

  mapError<F>(fn: (error: E) => F): Result<never, F> {
    return new Err(fn(this.error));
  }

  flatMap<U, F>(_fn: (value: never) => Result<U, F>): Result<U, E> {
    return this;
  }
}
 
/* ---------- Factory Methods ---------- */
export class ResultStatic {
  static ok<T>(value: T): Result<T, never> {
    return new Ok(value);
  }

  static err<E>(error: E): Result<never, E> {
    return new Err(error);
  }
}

export const ok = <T>(value: T): Result<T, never> => new Ok(value);

export const err = <E>(error: E): Result<never, E> => new Err(error);

// export class Success<T>{
//     readonly ok= true;
//     constructor(public readonly value:T){}
// }

// export class Failure<E>{
//     readonly ok= false;
//     constructor(public readonly error: E) {}
// }

// export const success= <T>(value:T):Result<T,never>=>new Success(value);

// export const failure = <E>(error: E): Result<never, E> =>
//   new Failure(error);
