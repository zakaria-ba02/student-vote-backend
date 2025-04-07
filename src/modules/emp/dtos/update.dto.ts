import { PartialType } from "@nestjs/mapped-types";
import { CreateEmpDto } from "./create.dto";

export class UpdateEmDto extends PartialType(CreateEmpDto) {

}