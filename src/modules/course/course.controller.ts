import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/create.dto";
import { UpdateCourseDto } from "./dto/update.dto";

@UseGuards(JwtAuthGuard)
@Controller("course")
export class CourseCountroller {
    constructor(private readonly courseService: CourseService) { }

    @Post()
    async createCourse(@Body() createDto: CreateCourseDto) {
        return await this.courseService.createCourse(createDto);
    }

    @Get()
    async getAllCourses() {
        return await this.courseService.getAllCourse();
    }

    @Get("open-course")
    async getAllOpenCourses() {
        return await this.courseService.getAllOpenCourse();
    }




    @Get('find-one/:id')
    async getCourseById(@Param('id') id: string) {
        return await this.courseService.getCourseById(id);
    }



    @Get('open-course')
    async getAllOpenCourse() {
        return await this.courseService.getAllOpenCourse()
    }

    @Patch('update/:id')
    async updateCourse(@Body() updateCourseDto: UpdateCourseDto, @Param("id") id: string) {
        return await this.courseService.updateCourse(id, updateCourseDto);
    }

    @Delete(':id')
    async deleteCourse(@Param('id') id: string) {
        return await this.courseService.deleteCourse(id);
    }

    @Get('tree')
    async getCourseTree() {
      return await this.courseService.getCourseTree();
    }
}