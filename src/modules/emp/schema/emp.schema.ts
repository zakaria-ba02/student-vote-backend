import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "../enums/role.enum";

@Schema({ timestamps: true })
export class Emp extends Document {


    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    dob: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({
        enum: Role,
        default: Role.EMP
    })
    role: string;


    @Prop()
    createdAt:string;

    @Prop()
    updatedAt:string;
}

export const EmpSchema = SchemaFactory.createForClass(Emp);
