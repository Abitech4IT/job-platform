import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/users/entities/user.entity';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true; // If no roles are required, allow access
    }
    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new ForbiddenException('user not authenticated');
    }

    const hasRequiredRoles = requiredRoles.some((role) => user.role === role);

    if (!hasRequiredRoles) {
      throw new ForbiddenException(
        'you do not have permission to perform this action',
      );
    }
    return true;
  }
}
