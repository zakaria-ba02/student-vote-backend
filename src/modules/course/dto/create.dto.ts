import { IsArray, IsEnum, IsInt, IsOptional, IsString } from "class-validator"
import { Type } from "class-transformer";
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

    // ✅ تعديل هنا
    @IsArray()
    @IsInt({ each: true })
    @Type(() => Number) // لتحويل القيم القادمة من JSON إلى أرقام
    semester: number[];

    @IsString()
    courseCode: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true }) // نتحقق أن كل عنصر في المصفوفة هو string
    prerequisites?: string[];
}
