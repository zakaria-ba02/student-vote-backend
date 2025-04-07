import { PartialType } from "@nestjs/mapped-types";
import { CreateMarkeDto } from "./create.dto";

export class UpdateMarkDto extends PartialType(CreateMarkeDto) {

}