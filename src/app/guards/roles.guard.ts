import {Role, User} from '@app/entities';
import {Injectable, CanActivate, ExecutionContext, ForbiddenException} from '@nestjs/common';
import {Reflector} from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [context.getHandler(), context.getClass()]);
    console.log(requiredRoles);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request?.user;
    if (!user) {
      throw new ForbiddenException('User does not have the required role to access resource');
    }

    const userWithRoles = await User.findByPk(user.sub, {
      include: [
        {
          model: Role,
          as: 'roles',
        },
      ],
});

    if (!userWithRoles) {
      throw new ForbiddenException('User does not have the required role to access resource');
    }

    const hasRequiredRole = requiredRoles.some((role) => userWithRoles.roles.some((userRole) => userRole.name === role));

    if (!hasRequiredRole) {
      throw new ForbiddenException('User does not have the required role to access resource');
    }

    return true;
  }
}
