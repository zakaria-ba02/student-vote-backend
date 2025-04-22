import { Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Course } from "src/modules/course/schema/course.schema";

export class Prer extends Document {
    @Prop({ required: true, ref:Course.name })
    courseId: number;


    //! Add course code and prerequesties courses  ex: courseCode : "EN2"  prerequesties : ["EN1","PH",".."]
}
export const prerSchema = SchemaFactory.createForClass(Prer);
