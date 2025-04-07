import { IsInt } from "class-validator";

export class CreatPrerDto {
    @IsInt()
    courseId: number;
}