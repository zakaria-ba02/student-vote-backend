import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CourseCountroller } from "./course.controller";
import { CourseService } from "./course.service";
import { Course, CourseSchema } from "./schema/course.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Course.name,
                schema: CourseSchema
            }
        ])
    ],
    controllers: [CourseCountroller],
    providers: [CourseService],
    exports: [CourseService]

})
export class CourseModule { }