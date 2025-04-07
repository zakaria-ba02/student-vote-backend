import { IsNotEmpty, IsNumber, IsString, isString } from "class-validator";

export class CreateStudentDto {
    @IsString()
    name: string;
    @IsString()
    major: string;
    @IsString()
    year: string;
    @IsNumber()
    universityId: number;
    @IsString()
    @IsNotEmpty()
    password:string
}                                                                