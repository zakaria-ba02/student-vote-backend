import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PrerController } from "./prerequisite.controller";
import { PrerService } from "./prerequisite.service";
import { Prer, prerSchema } from "./schema/prerequisite.schema";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Prer.name,
                schema: prerSchema
            }
        ])
    ],
    controllers: [PrerController],
    providers: [PrerService],
    exports: [PrerService]
})
export class PrerModule { }