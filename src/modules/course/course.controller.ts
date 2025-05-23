import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { GetStudentYear } from "src/common/decoraters";
import { YearEnum } from "src/common/enums/year.enum";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/create.dto";
import { UpdateCourseDto } from "./dto/update.dto";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Role } from "../emp/enums/role.enum";
import { Roles } from "src/common/decoraters/roles";

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("course")
export class CourseCountroller {
    studentModel: any;
    courseModel: any;
    prerService: any;
    constructor(private readonly courseService: CourseService) { }

    @Roles(Role.ADMIN)
    @Post("create-course")
    async createCourse(@Body() createDto: CreateCourseDto) {
        return await this.courseService.createCourse(createDto);
    }

    @Roles(Role.ADMIN)
    @Post("open-course-year")
    async openCourseOfYear(@Body("year") year: YearEnum) {
        return this.courseService.openCourseOfYear(year);
    }

    @Get("find-all-course")
    async getAllCourses() {
        return await this.courseService.getAllCourse();
    }

    @Get('find-one/:id')
    async getCourseById(@Param('id') id: string) {
        return await this.courseService.getCourseById(id);
    }

 //   @Get("avaible-course")
   // async avaibleCourse(@GetStudentYear() year: YearEnum) {
  //      return await this.courseService.getAvaiableOpenCourseForStudent(year);
 //   }

    @Get('open-course/:year')
    async getAllOpenCourse(@Param("year") year: YearEnum) {
        return await this.courseService.getAllOpenCourse(year);
    }

   

    @Roles(Role.ADMIN)
    @Patch('update/:id')
    async updateCourse(@Body() updateCourseDto: UpdateCourseDto, @Param("id") id: string) {
        return await this.courseService.updateCourse(id, updateCourseDto);
    }

    @Roles(Role.ADMIN)
    @Delete('delete/:id')
    async deleteCourse(@Param('id') id: string) {
        return await this.courseService.deleteCourse(id);
    }


    @Get('available/:studentId')
    async getAvailableCourses(@Param('studentId') studentId: string) {
      const student = await this.studentModel.findById(studentId);
      if (!student) throw new NotFoundException('الطالب غير موجود');
  
      const allCourses = await this.courseModel.find({ isOpen: true }).exec();
  
      const availableCourses = [];
      for (const course of allCourses) {
        const isAvailable = await this.prerService.checkCourseIsAvailable(
          course.courseCode,
          studentId
        );
        if (isAvailable) {
          availableCourses.push(course);
        }
      }
  
      return availableCourses;
    }
}