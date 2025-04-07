import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { Module } from "@nestjs/common";
import { StudentModule } from "../student/student.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Student, StudentSchema } from "../student/schema/student.schema";
import { JwtStrategy } from "src/common/utils/jwt.stratgy";
import { EmpModule } from "../emp/emp.module";
import { Emp, EmpSchema } from "../emp/schema/emp.schema";

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    imports: [EmpModule, StudentModule,
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {
                expiresIn: "7d"
            }
        }),
        MongooseModule.forFeature([
            {
                name: Emp.name,
                schema: EmpSchema
            },
            {
                name: Student.name,
                schema: StudentSchema
            }
        ])
    ]
})
export class AuthModule { }