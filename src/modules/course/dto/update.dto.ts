import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsOptional } from "class-validator";
import { CreateCourseDto } from "./create.dto";

export class UpdateCourseDto extends PartialType(CreateCourseDto) {
    @IsOptional()
    @IsBoolean()
    isOpen: boolean;
}