import { BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcryptjs";
import { Model } from "mongoose";
import { CreateEmpDto } from "./dtos/create.dto";
import { UpdateEmDto } from "./dtos/update.dto";
import { Emp } from "./schema/emp.schema";

export class EmpService {
    constructor(
        @InjectModel(Emp.name) private readonly empModel: Model<Emp>
    ) { }


    async createEmp(createDto: CreateEmpDto) {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(createDto.password, salt);
            createDto.password = hashPassword;
            const emp = await this.empModel.create(createDto);
            return await emp.save();
        } catch (error) {
            throw new BadRequestException("Error in Creating Emp");
        }
    }

    // error handling for all things

    async getAllEmp(): Promise<Emp[]> {
        try {
            return await this.empModel.find({});
        } catch (error) {
            throw new BadRequestException("No Emp found ");
        }
    }
    async getEmpById(id: string) {
        try {
            const emp = await this.empModel.findById(id);
            if (!emp) {
                throw new NotFoundException(`لا يوجد موظف بالمعرف: ${id}`);
            }
            return emp;
        } catch (error) {

            throw new BadRequestException("No Emp found with ID: ${id}");
        }
    }
    
    async findByEmail(email: string) {
        try {
            const emp = await this.empModel.findById(email)
            return emp
        } catch (error) {

        }
    }


    async updateEmp(id: string, emp: UpdateEmDto) {
        try {
            await this.empModel.findByIdAndUpdate(id, emp)
        } catch (error) {
            throw new BadRequestException(`Failed to update Emp with ID: ${id}: ${error.message}`);
        }
        return { message: "Emp updated successfully" }
    }

    async deleteEmp(id: string) {
        try {
            await this.empModel.findByIdAndDelete(id)
        } catch (error) {
            throw new BadRequestException("Failed to delete Emp with ID: ${id}: ${error.message}");
        }
        return { message: "Emp deleted successfully" }
    }
}
