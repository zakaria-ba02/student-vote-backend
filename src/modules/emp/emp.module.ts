import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EmpController } from "./emp.controller";
import { EmpService } from "./emp.service";
import { Emp, EmpSchema } from "./schema/emp.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Emp.name,
                schema: EmpSchema
            }
        ])
    ],
    providers: [EmpService],
    controllers: [EmpController],
    exports: [EmpService]
})

export class EmpModule { }