import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import jsonwebtoken from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const tokenData = request.headers.authorization.split(' ')[1];

    console.log('user', tokenData);

    if (!user || !requiredRoles.includes(user.role)) {
      throw new UnauthorizedException('You do not have the required role');
    }

    return true;
  }
}
function jwt_decode(tokenData: any) {
  // Implement the logic to decode the JWT token here
  // For example, you can use a library like jsonwebtoken to decode the token
  const decodedToken = jsonwebtoken.decode(tokenData);
  return decodedToken;
}
