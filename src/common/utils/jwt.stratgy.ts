import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Role } from "src/modules/emp/enums/role.enum";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy as any) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(payload: any) {
        if (!payload.role) {
            throw new UnauthorizedException('Role is missing in JWT payload');
        }

        if (payload.role === (Role.ADMIN || Role.EMP)) {
            return {
                _id:payload._id,
                name: payload.name,
                role: payload.role,
                email: payload.email,
                dob: payload.dob
            };
        }


        if (payload.role === Role.STUDENT) {
            return {
                _id:payload._id,
                name: payload.name,
                major: payload.major,
                universityId: payload.universityId,
                year: payload.year,
                role: payload.role,

            };
        }
        console.log(payload);
        
        throw new UnauthorizedException('Invalid role');
    }


}