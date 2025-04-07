import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginEmpDto {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}