import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { YearEnum } from "src/common/enums/year.enum";
@Schema()
export class Course extends Document {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    teacher: string;
    @Prop({ required: true })
    type: string;
    @Prop({ type: Boolean, default: false })
    isOpen: boolean;
    @Prop({ enum: YearEnum, required: true })
    year: number;
    @Prop({ required: true })
    semester: string
    @Prop({ required: true })
    courseCode: string;
    @Prop({ type: Types.ObjectId, ref: 'Course', default: null })
    parent: Course;
    @Prop({ default: false })
    isVotingOpen: boolean;

    @Prop()
    votingStart?: Date;

    @Prop()
    votingEnd?: Date;
    static isVotingOpen: any;
    static votingStart: any;
    static votingEnd: any;



}
export const CourseSchema = SchemaFactory.createForClass(Course);
