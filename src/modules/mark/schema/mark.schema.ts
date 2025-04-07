import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Course } from 'src/modules/course/schema/course.schema';
import { Student } from 'src/modules/student/schema/student.schema';

@Schema()
export class Marke extends Document {
    @Prop({ required: true, ref: Course.name })
    courseId: string;

    @Prop({ required: true, ref: Student.name })
    studentId: string;

    @Prop({ required: true })
    mark: number;

    @Prop({ required: true })
    type: string;
    @Prop()
    createdAt: string
    @Prop()
    UpdateAt: string
}

export const MarkeSchema = SchemaFactory.createForClass(Marke);
