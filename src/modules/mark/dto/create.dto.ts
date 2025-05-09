import { IsMongoId, IsString } from "class-validator";

export class CreateMarkDto {
    @IsString()
    @IsMongoId()
    courseId: string;
    
    @IsString()
    mark: number;

    @IsString()
    type: string;
    
    @IsString()
    studentId:string
    
}