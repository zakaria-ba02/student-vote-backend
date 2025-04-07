import { Body, Controller, Post } from "@nestjs/common";
import { CreateEmpDto } from "../emp/dtos/create.dto";
import { LoginEmpDto } from "../emp/dtos/login.dto";
import { CreateStudentDto } from "../student/dtos/create.dto";
import { LoginStudentDto } from "../student/dtos/login.dto";
import { AuthService } from "./auth.service";


@Controller("auth")
export class AuthController {
    constructor(
        private readonly authServies: AuthService
    ) { }

    @Post("registerEmp")
    async registerEmp(@Body() emp: CreateEmpDto) {
        return await this.authServies.registerEmp(emp)
    }
    @Post("registerStudent")
    async registerStudent(@Body() student: CreateStudentDto) {
        return await this.authServies.registerStudent(student)
    }

    @Post("loginEmp")
    async login(@Body() emp: LoginEmpDto) {
        return await this.authServies.loginEmp(emp)
    }

    @Post("loginStudent")
    async loginStudent(@Body() student: LoginStudentDto) {
        return await this.authServies.loginStudent(student)
    }

}