import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AbacPolicy } from "./policies/abac.policy";

@Injectable()
export class AbacGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException("User not authenticated");
    }
    // 🔹 ADMIN BYPASS (VERY IMPORTANT)
    if (user.roles?.includes("admin")) {
      return true;
    }

    // 🔹 Read ABAC policy (method + class)
    const policy = this.reflector.getAllAndOverride<AbacPolicy>("abac_policy", [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!policy) return true;

    // 🔹 Simulate resource fetch (Exercise 3)
    const resource = request.params?.id
      ? {
          id: request.params.id,
          ownerId: 2, // simulate DB owner
        }
      : null;

    return this.evaluatePolicy(policy, user, resource);
  }

  private evaluatePolicy(
    policy: AbacPolicy,
    user: any,
    resource: any
  ): boolean {
    // 🔹 User attribute checks
    if (policy.minAge && user.age < policy.minAge) return false;
    if (policy.department && user.department !== policy.department)
      return false;
    if (policy.country && user.country !== policy.country) return false;

    // 🔹 Resource ownership check (Exercise 3)
    if (policy.ownerField) {
      if (!resource) {
        throw new ForbiddenException("Resource not found");
      }

      const ownerId = resource[policy.ownerField];

      if (ownerId !== user.id) {
        throw new ForbiddenException("You do not own this resource");
      }
    }

    return true;
  }
}
