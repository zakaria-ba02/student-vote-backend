import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { YearEnum } from "src/common/enums/year.enum";

export class CreateStudentDto {
    @IsString()
    name: string;
    @IsString()
    major: string;
    @IsEnum(YearEnum)
    year: YearEnum;
    @IsNumber()
    universityId: number;
    @IsString()
    @IsNotEmpty()
    password:string
}                                                                