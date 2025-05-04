import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { YearEnum } from "src/common/enums/year.enum";
import { Role } from "src/modules/emp/enums/role.enum";
@Schema({ timestamps: true })
export class Student extends Document {
    @Prop({ required: true })
    name: string;
    @Prop({ required: true })
    major: string;
    @Prop({ enum:YearEnum,required: true })
    year: number;
    @Prop()
    universityId: number;
    @Prop()
    password: string;

    @Prop({
        enum: Role,
        default: Role.STUDENT
    })
    role: string;


    // @Prop({
    //     type: [{
    //         courseCode: String,
    //         grade: Number,
    //         date: Date
    //     }],
    //     default: []
    // })
    // completedCourses: {
    //     courseCode: string;
    //     grade: number;
    //     date: Date;
    // }[];
    @Prop({ 
        default: 0,
        min: 0,
        max: 171
    })
    completedHours: number;

   


}
export const StudentSchema = SchemaFactory.createForClass(Student);