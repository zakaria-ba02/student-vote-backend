import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Course } from "src/modules/course/schema/course.schema";
import { Student } from "src/modules/student/schema/student.schema";
@Schema()
export class Vote extends Document {
    @Prop({ required: true, ref: Student.name })
    studentId: string;
    @Prop({ required: true, ref: Course.name })
    courseId: string;
    @Prop({ required: true })
    vote: string;
    @Prop({ type: Boolean, default: false }) 
    isVotingOpen: boolean;
}
export const VoteSchema = SchemaFactory.createForClass(Vote);