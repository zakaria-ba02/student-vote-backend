import { IsMongoId, IsString } from "class-validator";

export class CreateMarkDto {
    @IsString()
    @IsMongoId()
    courseId: string;
    
    @IsString()
    mark: string;

    @IsString()
    type: string;
    
}