import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PolicyHandler } from '../gaurds/policies/policy.interface';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const policy = this.reflector.getAllAndOverride<PolicyHandler>(
      "policy_key",
      [context.getHandler(), context.getClass()],
    );

    if (!policy) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const allowed = policy.handle(user, request);

    if (!allowed) {
      throw new ForbiddenException(
        'Access denied by policy',
      );
    }

    return true;
  }
}
