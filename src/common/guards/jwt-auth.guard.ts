import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, emp: any, info: any): any {
        if (err || !emp) {
            throw err || new UnauthorizedException("Unauthorized Exception")
        }
        return emp;
    }


    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isActivated = await super.canActivate(context);
        if (!isActivated) return false;

        const request = context.switchToHttp().getRequest();
        if (!request.user) throw new UnauthorizedException();

        return true;
    }


}