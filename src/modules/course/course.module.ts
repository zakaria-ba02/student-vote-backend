import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Marke, MarkeSchema } from "../mark/schema/mark.schema";
import { Student, StudentSchema } from "../student/schema/student.schema";
import { CourseCountroller } from "./course.controller";
import { CourseService } from "./course.service";
import { Course, CourseSchema } from "./schema/course.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Course.name,
                schema: CourseSchema
            },
            {
                name: Marke.name,
                schema: MarkeSchema
            },
            {
                name: Student.name,
                schema: StudentSchema
            }

        ]),
    ],
    controllers: [CourseCountroller],
    providers: [CourseService],
    exports: [CourseService]

})
export class CourseModule { }