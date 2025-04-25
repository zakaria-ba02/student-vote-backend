import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Mark, MarkSchema } from "../mark/schema/mark.schema";
import { CourseCountroller } from "./course.controller";
import { CourseService } from "./course.service";
import { Course, CourseSchema } from "./schema/course.schema";
import { Student, StudentSchema } from "../student/schema/student.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Course.name,
                schema: CourseSchema
            },
            {
                name: Mark.name,
                schema: MarkSchema
            },
            {
                name: Student.name,
                schema: StudentSchema
            },
        ])
    ],
    controllers: [CourseCountroller],
    providers: [CourseService],
    exports: [CourseService]

})
export class CourseModule { }