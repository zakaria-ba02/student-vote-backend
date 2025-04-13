import { IsBoolean, IsEnum, isString, IsString } from "class-validator";
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
    @IsString()
    chapter: string;
    @IsString()
    courseCode: string
}