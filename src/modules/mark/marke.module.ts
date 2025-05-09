import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Student, StudentSchema } from "../student/schema/student.schema";
import { MarkController } from "./marke.controller";
import { MarkService } from "./marke.service";
import { CourseModule } from "../course/course.module";
import { Course, CourseSchema } from "../course/schema/course.schema";
import { Mark, MarkSchema } from "./schema/mark.schema";
import { StudentModule } from "../student/student.module";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Mark.name,
                schema: MarkSchema
            },
            {
                name:Student.name,
                schema:StudentSchema
            },
            {
                name:Course.name,
                schema:CourseSchema
            },
        ]),
        forwardRef(() =>  StudentModule),
        CourseModule
    ],
    controllers: [MarkController],
    providers: [MarkService],
    exports: [MarkService]
})
export class MarkModule {

}