// policies/policy.interface.ts
export interface Policy<T = any> {
  evaluate(user: T, resource?: any): boolean;
}

export interface PolicyHandler {
  handle(user: any, request: Request): boolean;
}