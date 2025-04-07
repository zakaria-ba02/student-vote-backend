import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema({ timestamps: true })
export class Student extends Document {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    major: string;
    @Prop({ required: true })
    year: string;
    @Prop()
    universityId: number;
    @Prop()
    password: string;
}
export const StudentSchema = SchemaFactory.createForClass(Student);