import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class LoginStudentDto {
    @IsNumber()
    universityId: number;
    
    @IsString()
    @IsNotEmpty()
    password: string
}