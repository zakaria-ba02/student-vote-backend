import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class LoginStudentDto {
    @IsString()
    universityId: number;
    
    @IsString()
    @IsNotEmpty()
    password: string
}