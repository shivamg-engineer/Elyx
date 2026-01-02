export type Option<T> = Some<T> | None;

export class Some<T> {
  readonly kind = 'some';
  constructor(public readonly value: T) {}
}
export class None {
  readonly kind = 'none';
}

export const none= new None();

export const some = <T>(value:T):Option<T>=> 
    new Some(value);

// Helpers
export const isSome= <T>(option: Option<T>):option is Some<T>=>
    option.kind==='some';

export const isNone= <T>(option:Option<T>):option is None=>
    option.kind === 'none';