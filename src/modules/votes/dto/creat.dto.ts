import { IsArray, ArrayMinSize, ArrayMaxSize, IsString } from "class-validator";

export class CreatVoteDto {
    @IsArray()
    @ArrayMinSize(1, { message: "يجب التصويت على 1 مواد على الأقل." })
    @ArrayMaxSize(7, { message: "يجب التصويت على 7 مواد كحد أقصى." })
    @IsString({ each: true })
    courseIds: string[];
    
}