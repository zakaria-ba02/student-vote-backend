// roles.guard.ts
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
  } from "@nestjs/common";
  import { Reflector } from "@nestjs/core";
  import { Role } from "src/modules/emp/enums/role.enum";
import { ROLES_KEY } from "../decoraters/roles";
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      
      if (!requiredRoles) return true;
  
      const request = context.switchToHttp().getRequest();
      const user = request.user;
        console.log(user);
        
      if (!user || !requiredRoles.includes(user.role)) {
        throw new ForbiddenException("You do not have permission to access this resource");
      }
  
      return true;
    }
  }
  