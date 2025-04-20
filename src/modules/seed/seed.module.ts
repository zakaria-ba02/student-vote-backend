import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Course, CourseSchema } from "../course/schema/course.schema";
import { Emp, EmpSchema } from "../emp/schema/emp.schema";
import { SeedService } from "./seed.service";

@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name:Emp.name,
                schema: EmpSchema
            },
            {
                name:Course.name,
                schema: CourseSchema
            }
        ])
    ],
    providers:[SeedService]
})
export class SeedModule{}