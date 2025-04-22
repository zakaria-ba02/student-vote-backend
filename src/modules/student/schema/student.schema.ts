import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "src/modules/emp/enums/role.enum";
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

    @Prop({
            enum: Role,
            default: Role.STUDENT
        })
        role: string;
}
export const StudentSchema = SchemaFactory.createForClass(Student);