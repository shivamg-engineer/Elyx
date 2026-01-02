import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import {
    CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}


  canActivate(context: ExecutionContext): boolean {
    // 1️⃣ Get required roles from metadata
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    
    console.log('🔍 Debug: Required roles:', requiredRoles);

    // 2️⃣ If no roles defined → allow access
    if (!requiredRoles || requiredRoles.length === 0) {
      console.log('🔍 Debug: No required roles, allowing access');
      return true;
    }

    // 3️⃣ Get user from request (set by auth guard)
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    console.log('🔍 Debug: User object:', user);
    console.log('🔍 Debug: User roles:', user?.roles);

    if (!user || !user.roles) {
      console.log('🔍 Debug: User or user.roles is missing');
      throw new ForbiddenException('Roles not found');
    }

    // 4️⃣ Check if user has at least ONE required role
    const hasRole = requiredRoles.some((role) => user.roles.includes(role));
    console.log('🔍 Debug: Has required role:', hasRole);
    
    if (!hasRole) {
      console.log('🔍 Debug: User does not have required role');
      throw new ForbiddenException('You do not have required role');
    }

    console.log('🔍 Debug: Access granted');
    return true;
  }
}
