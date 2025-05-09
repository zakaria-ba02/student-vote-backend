import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Student, StudentSchema } from "./schema/student.schema";
import { StudentController } from "./student.controller";
import { StudentService } from "./student.service";
import { Course, CourseSchema } from "../course/schema/course.schema";
import { CourseModule } from "../course/course.module";
import { MarkModule } from "../mark/marke.module";
import { Mark, MarkSchema } from "../mark/schema/mark.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Student.name,
                schema: StudentSchema
            },
            {
                name: Course.name,
                schema: CourseSchema
            },
            {
                name: Mark.name,
                schema: MarkSchema
            },
        ]),
        CourseModule,
        forwardRef(() =>  MarkModule)
    ],
    controllers: [StudentController],
    providers: [StudentService],
    exports: [StudentService]

})
export class StudentModule {

}