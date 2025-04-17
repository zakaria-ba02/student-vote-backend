import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Marke, MarkeSchema } from "../mark/schema/mark.schema";
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
        ])
    ],
    controllers: [CourseCountroller],
    providers: [CourseService],
    exports: [CourseService]

})
export class CourseModule { }