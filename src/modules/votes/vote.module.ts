import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Vote, VoteSchema } from "./schema/vote.schema";
import { VoteService } from "./vote.service";
import { VoteController } from "./vote.controller";
import { Student, StudentSchema } from "../student/schema/student.schema";
import { Course, CourseSchema } from "../course/schema/course.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Vote.name, schema: VoteSchema },
            {name:Student.name, schema:StudentSchema},
            {name:Course.name,schema:CourseSchema}
        ])
    ],
    controllers: [VoteController],
    providers: [VoteService],
})
export class VoteModule { }
