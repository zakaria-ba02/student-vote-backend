import { PartialType } from "@nestjs/mapped-types";
import { CreatPrerDto } from "./create.dto";

export class UpdatEPrerDto extends PartialType(CreatPrerDto) { }