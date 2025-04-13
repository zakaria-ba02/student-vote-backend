import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { YearEnum } from "src/common/enums/year.enum";
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

    @Get('find-one/:id')
    async getCourseById(@Param('id') id: string) {
        return await this.courseService.getCourseById(id);
    }



    @Get('open-course/:year')
    async getAllOpenCourse(@Param("year") year:YearEnum) {
        return await this.courseService.getAllOpenCourse(year);
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

    @Post("open-course-year")
    async openCourseOfYear(@Body("year") year: YearEnum) {
        return this.courseService.openCourseOfYear(year);
    }
}