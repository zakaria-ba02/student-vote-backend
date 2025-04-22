import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Roles } from "src/common/decoraters/roles";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Role } from "../emp/enums/role.enum";
import { CreateStudentDto } from "./dtos/create.dto";
import { UpdateStudentDto } from "./dtos/update.dto";
import { StudentService } from "./student.service";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";


@UseGuards(JwtAuthGuard,RolesGuard)
@Controller("student")
export class StudentController {
    constructor(
        private readonly studentService: StudentService
    ) { }

    @Roles(Role.STUDENT)
    @Post("crate-student")
    async createStudent(@Body() createStudentDto: CreateStudentDto) {
        return await this.studentService.createStudent(createStudentDto);
    }

    @Roles(Role.EMP,Role.ADMIN)
    @Get("get-all")
    async getAllStudents() {
        return await this.studentService.findAllStudent();
    }

    @Roles(Role.EMP,Role.ADMIN)
    @Get("get-ById/:id")
    async getStudentById(@Param("id") id: string) {
        const student = await this.studentService.findStudentById(id);
        return student;
    }

    @Roles(Role.EMP,Role.ADMIN)
    @Get("get-universityId/:universityId")
    async getStudentByUniversityId(@Param("universityId") universityId: number) {
        const student = await this.studentService.findByUniversityId(universityId);
    }

    @Roles(Role.ADMIN,Role.STUDENT)
    @Patch("update/:id")
    async updateStudent(@Body() updateStudentDto: UpdateStudentDto, @Param("id") id: string) {
        return await this.studentService.updateStudent(id, updateStudentDto);
    }

    @Roles(Role.ADMIN)
    @Delete("delete/:id")
    async deleteStudent(@Param("id") id: string) {
        return await this.studentService.deleteStudent(id);
    }

}

