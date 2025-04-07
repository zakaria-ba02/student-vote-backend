import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Student, StudentSchema } from "../student/schema/student.schema";
import { MarkController } from "./marke.controller";
import { MarkService } from "./marke.service";
import { Marke, MarkeSchema } from "./schema/mark.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Marke.name,
                schema: MarkeSchema
            },
            {
                name:Student.name,
                schema:StudentSchema
            }
        ])
    ],
    controllers: [MarkController],
    providers: [MarkService],
    exports: [MarkService]
})
export class MarkModule {

}