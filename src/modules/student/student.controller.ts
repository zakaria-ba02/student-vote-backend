import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { Roles } from "src/common/decoraters/roles";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Role } from "../emp/enums/role.enum";
import { CreateStudentDto } from "./dtos/create.dto";
import { UpdateStudentDto } from "./dtos/update.dto";
import { StudentService } from "./student.service";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { YearEnum } from "src/common/enums/year.enum";


@UseGuards(JwtAuthGuard, RolesGuard)
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

    @Roles(Role.EMP, Role.ADMIN)
    @Get("get-all")
    async getAllStudents() {
        return await this.studentService.findAllStudent();
    }

    @Roles(Role.EMP, Role.ADMIN)
    @Get("get-ById/:id")
    async getStudentById(@Param("id") id: string) {
        const student = await this.studentService.findStudentById(id);
        return student;
    }

    @Roles(Role.EMP, Role.ADMIN)
    @Get("get-universityId/:universityId")
    async getStudentByUniversityId(@Param("universityId") universityId: number) {
        const student = await this.studentService.findByUniversityId(universityId);
    }

    @Roles(Role.STUDENT)
    @Get(":studentId/gpa/semester")
    async getSemesterGPA(@Param('studentId') studentId: string, @Query("year") year: YearEnum, @Query("semeter") semester: number) {
        return this.studentService.calculateSemesterGPA(studentId, year, semester);
    }

    @Roles(Role.STUDENT)
    @Get(":studentId/gpa/cumulative")
    async getCumulativeGPA(@Param('studentId') studentId: string) {
        return this.studentService.calculateCumulativeGPA(studentId);
    }

    @Roles(Role.ADMIN, Role.STUDENT)
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

