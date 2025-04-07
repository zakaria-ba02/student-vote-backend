import { IsInt, IsMongoId, IsString } from "class-validator";

export class CreateMarkeDto {
    @IsString()
    @IsMongoId()
    courseId: string;
    
    

    @IsString()
    mark: string;

    @IsString()
    type: string;
    
}