// bulk-import.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BulkImportMarkDto {
    @IsNotEmpty()
    @IsString()
    courseId: string;

    @IsNotEmpty()
    @IsString()
    studentId: string;

    @IsNotEmpty()
    @IsNumber()
    mark: number;

    @IsNotEmpty()
    @IsString()
    type: string;
}