import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { Roles } from "src/common/decoraters/roles";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Role } from "../emp/enums/role.enum";
import { CreateStudentDto } from "./dtos/create.dto";
import { UpdateStudentDto } from "./dtos/update.dto";
import { StudentService } from "./student.service";


@UseGuards(RolesGuard)
@Controller("student")
export class StudentController {
    constructor(
        private readonly studentService: StudentService
    ) { }
    @Post()
    async createStudent(@Body() createStudentDto: CreateStudentDto) {
        return await this.studentService.createStudent(createStudentDto);
    }

    // @Roles(Role.ADMIN)
    @Get()
    async getAllStudents() {
        return await this.studentService.findAllStudent();
    }
    @Get(":id")
    async getStudentById(@Param("id") id: string) {
        const student = await this.studentService.findStudentById(id);
        return student;
    }
    @Get(":universityId")
    async getStudentByUniversityId(@Param("universityId") universityId: number) {
        const student = await this.studentService.findByUniversityId(universityId);
    }

    @Patch(":id")
    async updateStudent(@Body() updateStudentDto: UpdateStudentDto, @Param("id") id: string) {
        return await this.studentService.updateStudent(id, UpdateStudentDto);
    }
    @Delete(":id")
    async deleteStudent(@Param("id") id: string) {
        return await this.studentService.deleteStudent(id);
    }

}

