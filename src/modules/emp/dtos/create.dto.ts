import { IsDateString, IsEmail, IsNotEmpty, IsString} from "class-validator";

export class CreateEmpDto {
    @IsString()
    name: string;
    @IsEmail()
    email: string;
    @IsDateString()
    dob: string;
    @IsString()
    @IsNotEmpty()
    password: string;
}