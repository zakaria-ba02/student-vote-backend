import { BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreatPrerDto } from "./dto/create.dto";
import { UpdatEPrerDto } from "./dto/update.dto";
import { Prer } from "./schema/prerequisite.schema";

export class PrerService {
    constructor(
        @InjectModel(Prer.name) private readonly prerModel: Model<Prer>
    ) { }

    async createPrer(createDto: CreatPrerDto) {
        try {
            const Prer = await this.prerModel.create(createDto);
            return await Prer.save();
        } catch (error) {
            throw new BadRequestException("Error in Creating Prer");
        }
    }

    async getAllPrer() {
        try {
            const prer = await this.prerModel.find({}).populate("courseId").exec();
            return prer;
        } catch (error) {
            throw new BadRequestException("No Prer found ");
        }
    }
    async getPrerById(id: string) {
        try {
            const prer = await this.prerModel.findById( id)
            return prer;
        } catch (error) {

            throw new BadRequestException("No Prer found with ID: ${id}");
        }
    }

    async updatePrer(id: string, prer: UpdatEPrerDto) {
        try {
            await this.prerModel.findByIdAndUpdate(id, Prer)
        } catch (error) {
            throw new BadRequestException("Failed to update Prer with ID: ${id}: ${error.message}");
        }
        return { message: " updated Prer successfully" }
    }

    async deletePrer(id: string) {
        try {
            await this.prerModel.findByIdAndDelete(id)
        } catch (error) {
            throw new BadRequestException("Failed to delete Prer with ID: ${id}: ${error.message}");
        }
        return { message: "Prer deleted successfully" }
    }
}