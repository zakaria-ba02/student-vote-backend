import { PartialType } from "@nestjs/mapped-types";
import { CreatVoteDto } from "./creat.dto";

export class UpdateVoteDto extends PartialType(CreatVoteDto) {

}