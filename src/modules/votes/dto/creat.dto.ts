import { IsString} from "class-validator";

export class CreatVoteDto {
    @IsString()
    courseId: string;
    @IsString()
    vote: string;
}