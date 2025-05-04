import { IsArray, ArrayMinSize, ArrayMaxSize, IsString } from "class-validator";

export class CreatVoteDto {
    @IsArray()
    @ArrayMinSize(4, { message: "يجب التصويت على 4 مواد على الأقل." })
    @ArrayMaxSize(6, { message: "يجب التصويت على 6 مواد كحد أقصى." })
    @IsString({ each: true })
    courseIds: string[];
    
}