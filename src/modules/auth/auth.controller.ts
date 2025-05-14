    import { Body, Controller, Post } from "@nestjs/common";
    import { CreateEmpDto } from "../emp/dtos/create.dto";
    import { LoginEmpDto } from "../emp/dtos/login.dto";
    import { CreateStudentDto } from "../student/dtos/create.dto";
    import { LoginStudentDto } from "../student/dtos/login.dto";
    import { AuthService } from "./auth.service";
    import { LoginAdminDto } from "../emp/dtos/login-admin.dto";


    @Controller("auth")
    export class AuthController {
        constructor(
            private readonly authServies: AuthService
        ) { }



        @Post("registerStudent")
        async registerStudent(@Body() student: CreateStudentDto) {
            return await this.authServies.registerStudent(student)
        }

        @Post("loginEmp")
        async loginEmp(@Body() emp: LoginEmpDto) {
            return await this.authServies.loginEmp(emp)
        }

        @Post("loginAdmin")
        async loginAdmin(@Body() admin: LoginAdminDto) {
            return await this.authServies.loginEmp(admin)
        }

        @Post("loginStudent")
        async loginStudent(@Body() student: LoginStudentDto) {
            return await this.authServies.loginStudent(student)
        }

    }