import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Course } from "src/modules/course/schema/course.schema";

export class Prer extends Document {
    @Prop({ required: true, ref:Course.name })
    courseId: number;

}
export const prerSchema = SchemaFactory.createForClass(Prer);
