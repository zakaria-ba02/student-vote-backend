import { IsInt, IsString, isString } from "class-validator";

export class CreatVoteDto {

    //! YOU SHOULD REMOVE THE STUDENT ID AND GET THE STUDENT ID FROM THE JWT PAYLOAD
  
    @IsString()
    courseId: string;
    @IsString()
    vote: string;
}