import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Course } from 'src/modules/course/schema/course.schema';
import { Student } from 'src/modules/student/schema/student.schema';

@Schema()
export class Mark extends Document {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: Course.name })
    courseId: mongoose.Types.ObjectId;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: Student.name })
    studentId: mongoose.Types.ObjectId;

    @Prop({ required: true })
    mark: number;

    @Prop({ required: true })
    type: string;

    @Prop()
    createdAt: string

    @Prop()
    UpdateAt: string
}

export const MarkSchema = SchemaFactory.createForClass(Mark);


