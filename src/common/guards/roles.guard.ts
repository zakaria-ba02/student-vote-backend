import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
  } from "@nestjs/common";
  import { Reflector } from "@nestjs/core";
  import { Role } from "src/modules/emp/enums/role.enum";
import { ROLES_KEY } from "../decoraters/roles";
import { EmpService } from "src/modules/emp/emp.service";
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector,private empService:EmpService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      
      if (!requiredRoles) return true;
  
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      
      if (!user || !requiredRoles.includes(user.role)) {
        throw new ForbiddenException("You do not have permission to access this resource");
      }
  
      if(user.role==Role.EMP){
      const isActive= await this.empService.isActive(user._id);
      return isActive;
      }else{
      return true;
      }
    }
  }
  