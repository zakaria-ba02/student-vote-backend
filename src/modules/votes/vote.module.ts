import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Vote, VoteSchema } from "./schema/vote.schema";
import { VoteService } from "./vote.service";
import { VoteController } from "./vote.controller";
import { Course, CourseSchema } from "../course/schema/course.schema";
import { Mark, MarkSchema } from "../mark/schema/mark.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Vote.name, schema: VoteSchema },
            {name:Course.name,schema:CourseSchema},{
                name: Mark.name,
                schema: MarkSchema
            }
        ]),
      
    ],
    controllers: [VoteController],
    providers: [VoteService],
})
export class VoteModule { }
