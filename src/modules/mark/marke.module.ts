import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Student, StudentSchema } from "../student/schema/student.schema";
import { MarkController } from "./marke.controller";
import { MarkService } from "./marke.service";
import { CourseModule } from "../course/course.module";
import { Course, CourseSchema } from "../course/schema/course.schema";
import { Mark, MarkSchema } from "./schema/mark.schema";

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
        CourseModule
    ],
    controllers: [MarkController],
    providers: [MarkService],
    exports: [MarkService]
})
export class MarkModule {

}