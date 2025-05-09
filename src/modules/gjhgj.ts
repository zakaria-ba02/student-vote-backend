// import { Body, Controller, Post } from "@nestjs/common";
// import { CreateEmpDto } from "../emp/dtos/create.dto";
// import { LoginEmpDto } from "../emp/dtos/login.dto";
// import { CreateStudentDto } from "../student/dtos/create.dto";
// import { LoginStudentDto } from "../student/dtos/login.dto";
// import { AuthService } from "./auth.service";


// @Controller("auth")
// export class AuthController {
//     constructor(
//         private readonly authServies: AuthService
//     ) { }

//     @Post("registerEmp")
//     async registerEmp(@Body() emp: CreateEmpDto) {
//         return await this.authServies.registerEmp(emp)
//     }
//     @Post("registerStudent")
//     async registerStudent(@Body() student: CreateStudentDto) {
//         return await this.authServies.registerStudent(student)
//     }

//     @Post("loginEmp")
//     async login(@Body() emp: LoginEmpDto) {
//         return await this.authServies.loginEmp(emp)
//     }

//     @Post("loginStudent")
//     async loginStudent(@Body() student: LoginStudentDto) {
//         return await this.authServies.loginStudent(student)
//     }

// }
// import { IsEmail, IsNotEmpty, IsString } from "class-validator";

// export class LoginEmpDto {
//     @IsEmail()
//     email: string;

//     @IsString()
//     @IsNotEmpty()
//     password: string;
// }import { IsDateString, IsEmail, IsNotEmpty, IsString} from "class-validator";

// export class CreateEmpDto {
//     @IsString()
//     name: string;

//     @IsEmail()
//     email: string;

//     @IsDateString()
//     dob: string;
    
//     @IsString()
//     @IsNotEmpty()
//     password: string;
// }import { PartialType } from "@nestjs/mapped-types";
// import { CreateEmpDto } from "./create.dto";

// export class UpdateEmDto extends PartialType(CreateEmpDto) {

// }import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UseGuards } from "@nestjs/common";
// import { GetStudentYear } from "src/common/decoraters";
// import { YearEnum } from "src/common/enums/year.enum";
// import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
// import { CourseService } from "./course.service";
// import { CreateCourseDto } from "./dto/create.dto";
// import { UpdateCourseDto } from "./dto/update.dto";
// import { RolesGuard } from "src/common/guards/roles.guard";
// import { Role } from "../emp/enums/role.enum";
// import { Roles } from "src/common/decoraters/roles";
// import { Course } from "./schema/course.schema";

// @UseGuards(JwtAuthGuard, RolesGuard)
// @Controller("course")
// export class CourseController {
//   studentModel: any;
//   courseModel: any;
//   prerService: any;
//   constructor(private readonly courseService: CourseService) { }

//   // @Roles(Role.ADMIN)
//   // @Post("create-course")
//   // async createCourse(@Body() createDto: CreateCourseDto) {
//   //   return await this.courseService.createCourse(createDto);
//   // }


//   @Post("create-course")
//   create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
//     return this.courseService.createCourse(createCourseDto);
//   }

//   @Roles(Role.ADMIN)
//   @Post("open-course-year")
//   async openCourseOfYear(@Body("year") year: YearEnum) {
//     return this.courseService.openCourseOfYear(year);
//   }

//   @Get("find-all-course")
//   async getAllCourses() {
//     return await this.courseService.getAllCourse();
//   }

//   @Get('find-one/:id')
//   async getCourseById(@Param('id') id: string) {
//     return await this.courseService.getCourseById(id);
//   }

//   @Get(':code/prerequisites')
//   getPrerequisites(@Param('code') code: string): Promise<Course[]> {
//     return this.courseService.getPrerequisites(code);
//   }

//   //   @Get("avaible-course")
//   // async avaibleCourse(@GetStudentYear() year: YearEnum) {
//   //      return await this.courseService.getAvaiableOpenCourseForStudent(year);
//   //   }

//   @Get('open-course/:year')
//   async getAllOpenCourse(@Param("year") year: YearEnum) {
//     return await this.courseService.getAllOpenCourse(year);
//   }



//   @Roles(Role.ADMIN)
//   @Patch('update/:id')
//   async updateCourse(@Body() updateCourseDto: UpdateCourseDto, @Param("id") id: string) {
//     return await this.courseService.updateCourse(id, updateCourseDto);
//   }

//   @Roles(Role.ADMIN)
//   @Delete('delete/:id')
//   async deleteCourse(@Param('id') id: string) {
//     return await this.courseService.deleteCourse(id);
//   }


//   @Get('available/:studentId')
//   async getAvailableCourses(@Param('studentId') studentId: string) {
//     const student = await this.studentModel.findById(studentId);
//     if (!student) throw new NotFoundException('الطالب غير موجود');

//     const allCourses = await this.courseModel.find({ isOpen: true }).exec();

//     const availableCourses = [];
//     for (const course of allCourses) {
//       const isAvailable = await this.prerService.checkCourseIsAvailable(
//         course.courseCode,
//         studentId
//       );
//       if (isAvailable) {
//         availableCourses.push(course);
//       }
//     }

//     return availableCourses;
//   }

  
// }import { PartialType } from "@nestjs/mapped-types";
// import { IsBoolean, IsOptional } from "class-validator";
// import { CreateCourseDto } from "./create.dto";

// export class UpdateCourseDto extends PartialType(CreateCourseDto) {
//     @IsOptional()
//     @IsBoolean()
//     isOpen: boolean;
// }import { IsArray, IsEnum, IsInt, IsOptional, IsString } from "class-validator"
// import { YearEnum } from "src/common/enums/year.enum"


// export class CreateCourseDto {
//     @IsString()
//     name: string

//     @IsString()
//     teacher: string

//     @IsString()
//     type: string

//     @IsEnum(YearEnum)
//     year: number
    
//     @IsString()
//     semester: string

//     @IsString()
//     courseCode: string

//     @IsOptional()
//     @IsArray()
//     prerequisites?: string[];

// }import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
// import { CreateEmpDto } from "./dtos/create.dto";
// import { UpdateEmDto } from "./dtos/update.dto";
// import { EmpService } from "./emp.service";
// import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";

// UseGuards(JwtAuthGuard)
// @Controller("emp")
// export class EmpController {
//     constructor(
//         private readonly empService: EmpService
//     ) { }

//     @Post("create")
//     async createEmp(@Body() createDto: CreateEmpDto) {
//         return await this.empService.createEmp(createDto);
//     }
//     @Get("find-all")
//     async getAll() {
//         return await this.empService.getAllEmp();
//     }

//     @Get("find-byid/:id")
//     async getEmpById(@Param("id") id: string) {
//         const emp = await this.empService.getEmpById(id);
//         return emp;
//     }
//     @Patch("update/:id")
//     async updateStudent(@Body() updateEmpDto:UpdateEmDto,@Param("id")id:string ) {
//         return await this.empService.updateEmp(id,updateEmpDto);
//     }
  
//     @Delete('delete/:id')
//     async deleteEmp(@Param('id') id: string) {
//         return await this.empService.deleteEmp(id);
//     }
// }export enum Role{
//   ADMIN="admin",
//   STUDENT="student",
//   EMP="emp"
// }import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
// import { GetStudentId } from "src/common/decoraters";
// import { Roles } from "src/common/decoraters/roles";
// import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
// import { RolesGuard } from "src/common/guards/roles.guard";
// import { Role } from "../emp/enums/role.enum";
// import { CreateMarkDto } from "./dto/create.dto";
// import { UpdateMarkDto } from "./dto/update.dto";
// import { MarkService } from "./marke.service";
// import { BulkImportMarkDto } from "./dto/bulk-import-mark.dto";


// @Controller("mark")
// @UseGuards(JwtAuthGuard, RolesGuard)
// export class MarkController {
//     constructor(
//         private readonly markService: MarkService
//     ) { }

//     // @Post("create-marks")
//     // // @Roles(Role.EMP)
//     // async createMark(@Body() createDto: CreateMarkDto, @GetStudentId() studentId: string) {
//     //     return await this.markService.createMark(createDto, studentId);
//     // }
//     @Roles(Role.EMP)
//     @Post('bulk-import')
//     async bulkImport(@Body() bulkImportDto: BulkImportMarkDto[]) {
//         return this.markService.bulkImportMarks(bulkImportDto);
//     }


//     @Roles(Role.EMP, Role.STUDENT)
//     @Get("get-my-marks")
//     async getMyMarks(@GetStudentId() studentId: string) {
//         return await this.markService.getMarkByStudentId(studentId);
//     }

//     @Roles(Role.EMP, Role.STUDENT)
//     @Get("get-all-marks")
//     async getAllMark() {
//         return await this.markService.getAllMark();
//     }

//     @Roles(Role.EMP, Role.STUDENT)
//     @Get('find-by-id/:id')
//     async getMarkById(@Param('id') id: string) {
//         return await this.markService.getMarkById(id);
//     }

//     @Patch('update/:id')
//     @Roles(Role.EMP)
//     async updateMark(@Body() body: {
//         id: string,
//         updateDto: UpdateMarkDto
//     }
//     ) {
//         return await this.markService.updateMark(body.id, body.updateDto);
//     }

//     @Roles(Role.EMP)
//     @Delete('delete/:id')
//     async deleteMark(@Param('id') id: string) {
//         return await this.markService.deleteMark(id);
//     }

// }// bulk-import.dto.ts
// import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

// export class BulkImportMarkDto {
//     @IsNotEmpty()
//     @IsString()
//     courseId: string;

//     @IsNotEmpty()
//     @IsString()
//     studentId: string;

//     @IsNotEmpty()
//     @IsNumber()
//     mark: number;

//     @IsNotEmpty()
//     @IsString()
//     type: string;
// }import { IsMongoId, IsString } from "class-validator";

// export class CreateMarkDto {
//     @IsString()
//     @IsMongoId()
//     courseId: string;
    
//     @IsString()
//     mark: number;

//     @IsString()
//     type: string;
    
//     @IsString()
//     studentId:string
    
// }import { PartialType } from "@nestjs/mapped-types";
// import { CreateMarkDto } from "./create.dto";

// export class UpdateMarkDto extends PartialType(CreateMarkDto) {

// }import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
// import { Roles } from "src/common/decoraters/roles";
// import { RolesGuard } from "src/common/guards/roles.guard";
// import { Role } from "../emp/enums/role.enum";
// import { CreateStudentDto } from "./dtos/create.dto";
// import { UpdateStudentDto } from "./dtos/update.dto";
// import { StudentService } from "./student.service";
// import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
// import { YearEnum } from "src/common/enums/year.enum";


// @UseGuards(JwtAuthGuard, RolesGuard)
// @Controller("student")
// export class StudentController {
//     constructor(
//         private readonly studentService: StudentService
//     ) { }

//     //@Roles(Role.STUDENT)
//     @Post("crate-student")
//     async createStudent(@Body() createStudentDto: CreateStudentDto) {
//         return await this.studentService.createStudent(createStudentDto);
//     }

//    // @Roles(Role.EMP, Role.ADMIN)
//     @Get("get-all")
//     async getAllStudents() {
//         return await this.studentService.findAllStudent();
//     }

//    // @Roles(Role.EMP, Role.ADMIN)
//     @Get("get-ById/:id")
//     async getStudentById(@Param("id") id: string) {
//         const student = await this.studentService.findStudentById(id);
//         return student;
//     }

//     @Get('find')
//   async findByName(@Query('name') name: string) {
//     return this.studentService.findStudentByName(name);
//   }

//     @Get("get-ByName/:name")
//     async getStudentByName(@Param("name") name: string) {
//         const student = await this.studentService.findStudentByName(name);
//         return student;
//     }

//    // @Roles(Role.EMP, Role.ADMIN)
//     @Get("get-universityId/:universityId")
//     async getStudentByUniversityId(@Param("universityId") universityId: number) {
//         const student = await this.studentService.findByUniversityId(universityId);
//     }

//   //  @Roles(Role.STUDENT)
//     @Get(":studentId/gpa/semester")
//     async getSemesterGPA(@Param('studentId') studentId: string, @Query("year") year: YearEnum, @Query("semester") semester: number) {
//         return this.studentService.calculateSemesterGPA(studentId, year, semester);
//     }

//    // @Roles(Role.STUDENT)
//     @Get(":studentId/gpa/cumulative")
//     async getCumulativeGPA(@Param('studentId') studentId: string) {
//         return this.studentService.calculateCumulativeGPA(studentId);
//     }

//    // @Roles(Role.ADMIN, Role.STUDENT)
//     @Patch("update/:id")
//     async updateStudent(@Body() updateStudentDto: UpdateStudentDto, @Param("id") id: string) {
//         return await this.studentService.updateStudent(id, updateStudentDto);
//     }

//    // @Roles(Role.ADMIN)
//     @Delete("delete/:id")
//     async deleteStudent(@Param("id") id: string) {
//         return await this.studentService.deleteStudent(id);
//     }

// }

// import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
// import { YearEnum } from "src/common/enums/year.enum";

// export class CreateStudentDto {
//     @IsString()
//     name: string;
//     @IsString()
//     major: string;
//     @IsEnum(YearEnum)
//     year: YearEnum;
//     @IsNumber()
//     universityId: number;
//     @IsString()
//     @IsNotEmpty()
//     password:string
// }                                                                import { IsNotEmpty, IsString } from "class-validator";

// export class LoginStudentDto {
//     @IsString()
//     universityId: number;
    
//     @IsString()
//     @IsNotEmpty()
//     password: string
// }import { PartialType } from "@nestjs/mapped-types";
// import { CreateStudentDto } from "./create.dto";

// export class UpdateStudentDto extends PartialType(CreateStudentDto) {

// }import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
// import { GetStudentId } from "src/common/decoraters";
// import { Roles } from "src/common/decoraters/roles";
// import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
// import { RolesGuard } from "src/common/guards/roles.guard";
// import { Role } from "../emp/enums/role.enum";
// import { CreatVoteDto } from "./dto/creat.dto";
// import { UpdateVoteDto } from "./dto/update.dto";
// import { VoteService } from "./vote.service";



// @UseGuards(JwtAuthGuard, RolesGuard)
// @Controller("votes")
// export class VoteController {
//     constructor(private readonly voteService: VoteService) { }

//     // @Roles(Role.STUDENT)
//     // @Post("create-vote")
//     // async createVote(@Body() createVoteDto: CreatVoteDto, @GetStudentId() studentId: string) {
//     //     return await this.voteService.createVote(createVoteDto, studentId);
//     // }
//     @Post("create-vote")
//     async createVote(@Body() createVoteDto: CreatVoteDto, @GetStudentId() studentId: string) {
//         return this.voteService.createVote(createVoteDto, studentId);
//     }

    
//     @Get("find-my-voted")
//     async getMyVotedCourse(@GetStudentId() studentId: string) {
//         return await this.voteService.getMyVotedCourse(studentId);
//     }

//     @Get("find-all")
//     async getAllVotes() {
//         return this.voteService.getAllVote();
//     }

//     @Get("find-by-id/:id")
//     async getVoteById(@Param("id") id: string) {
//         const vote = await this.voteService.getVoteById(id);
//         return vote;
//     }

//     @Get('course-votes')
//     async getAllVotedCourse(
//         @Query('courseId') courseId: string,
//         @Query('startDate') startDate: string,
//         @Query('endDate') endDate: string
//     ) {
//         const start = new Date(startDate);
//         const end = new Date(endDate);

//         return await this.voteService.getAllVotedCourse(courseId, start, end);

//     }


//     @Roles(Role.STUDENT)
//     @Patch("update/:id")
//     async updateVote(@Body() updateVoteDto: UpdateVoteDto, @Param("id") id: string) {
//         return await this.voteService.updateVote(id, updateVoteDto);
//     }

//     @Patch("open-voting/:id")
//     @Roles(Role.ADMIN) 
//     async openVoting(
//         @Param("id") courseId: string,
//         @Query("startDate") startDate: string,
//         @Query("endDate") endDate: string
//     ) {
//         const start = new Date(startDate);
//         const end = new Date(endDate);
//         return this.voteService.openVoting(courseId, start, end);
//     }


//     @Patch("close-voting/:id")
//     @Roles(Role.ADMIN)
//     async closeVoting(@Param("id") courseId: string) {
//         return this.voteService.closeVoting(courseId);
//     }
    

//     @Roles(Role.STUDENT)
//     @Delete("delete/:id")
//     async deleteVote(@Param("id") id: string) {
//         return await this.voteService.deleteVote(id);
//     }


    

    

    


// }import { IsArray, ArrayMinSize, ArrayMaxSize, IsString } from "class-validator";

// export class CreatVoteDto {
//     @IsArray()
//     @ArrayMinSize(4, { message: "يجب التصويت على 4 مواد على الأقل." })
//     @ArrayMaxSize(6, { message: "يجب التصويت على 6 مواد كحد أقصى." })
//     @IsString({ each: true })
//     courseIds: string[];
    
// }import { PartialType } from "@nestjs/mapped-types";
// import { CreatVoteDto } from "./creat.dto";

// export class UpdateVoteDto extends PartialType(CreatVoteDto) {

// }