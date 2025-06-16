import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { YearEnum } from "src/common/enums/year.enum";

@Schema({ timestamps: true })
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

    // ✅ تم تعديل هذا الحقل ليكون Array
    @Prop({ type: [Number], required: true, enum: [1, 2] })
    semester: number[];

    @Prop({ required: true })
    courseCode: string;

    @Prop({ default: false })
    isVotingOpen: boolean;

    @Prop({ required: true, default: 3 })
    creditHours: number;

    @Prop()
    votingStart?: Date;

    @Prop()
    votingEnd?: Date;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Course' }], default: [] })
    prerequisites: Types.ObjectId[] | Course[];

    @Prop()
    createdAt: string

    @Prop()
    updateAt: string
}

export const CourseSchema = SchemaFactory.createForClass(Course);
