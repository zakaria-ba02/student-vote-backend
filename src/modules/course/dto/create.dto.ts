import { isString, IsString } from "class-validator";

export class CreateCourseDto {
    @IsString()
    name: string;
    @IsString()
    teacher: string;
    @IsString()
    type: string;
    @IsString()
    year: string;
    @IsString()
    chapter: string;
    @IsString()
    courseCode: string

}