import {Role, User} from '@app/entities';
import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common';
import {Reflector} from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()]);

    if (!requiredRoles) {
      return true;
    }

    const {user} = context.switchToHttp().getRequest();

    if (!user) {
      return false;
    }

    const userWithRoles = await User.findByPk(user.id, {include: [Role]});

    if (!userWithRoles) {
      return false;
    }

    return requiredRoles.some((role) => userWithRoles.roles.some((userRole) => userRole.name === role.name));
  }
}
