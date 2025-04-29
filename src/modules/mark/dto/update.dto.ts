import { PartialType } from "@nestjs/mapped-types";
import { CreateMarkDto } from "./create.dto";

export class UpdateMarkDto extends PartialType(CreateMarkDto) {

}