import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
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
    @Prop({ required: true })
    year: string;
    @Prop({ required: true })
    chapter: string
    @Prop({ required: true })
    courseCode: string;
    @Prop({ type: Types.ObjectId, ref: 'Course', default: null })
    parent: Course;


}
export const CourseSchema = SchemaFactory.createForClass(Course);
