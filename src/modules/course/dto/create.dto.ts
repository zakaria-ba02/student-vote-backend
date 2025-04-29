import { IsEnum, IsInt, IsString } from "class-validator";
import { YearEnum } from "src/common/enums/year.enum";

export class CreateCourseDto {
    @IsString()
    name: string;
    @IsString()
    teacher: string;
    @IsString()
    type: string;
    @IsEnum(YearEnum)
    year: number;
    @IsInt()
    semester: number;
    @IsString()
    courseCode: string
}