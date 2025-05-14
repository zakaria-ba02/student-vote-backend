import { PartialType } from "@nestjs/mapped-types";
import { CreateMarkDto } from "./create.dto";
import { BulkImportMarkDto } from "./bulk-import-mark.dto";

export class UpdateMarkDto extends PartialType(BulkImportMarkDto) {

}