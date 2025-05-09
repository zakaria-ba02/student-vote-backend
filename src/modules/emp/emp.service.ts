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


    async createEmp(createDto: CreateEmpDto): Promise<Emp> {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(createDto.password, salt);
            createDto.password = hashPassword;
            const emp = await this.empModel.create(createDto);
            return await emp.save();
        } catch (error) {
            console.error('Error in createEmp:', error);
        throw new BadRequestException(`Error creating employee: ${error.message}`);
        }
    }

    // error handling for all things

    async getAllEmp(): Promise<Emp[]> {
        try {
            const employees = await this.empModel.find({});
            if (!employees || employees.length === 0) {
                throw new BadRequestException('No employees found');
            }
            return employees;
        } catch (error) {
            console.error('Error in getAllEmp:', error);
            throw new BadRequestException(`Failed to retrieve employees: ${error.message}`);
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
            throw new NotFoundException(`Error finding employee with ID ${id}: ${error.message}`);
        }
    }
    
    async findByEmail(email: string) {
        try {
            const emp = await this.empModel.findOne({ email });
            if (!emp) {
                throw new NotFoundException(`Employee with email ${email} not found`);
            }
            return emp;
        } catch (error) {
            console.error('Error in findByEmail:', error);
            throw new BadRequestException(`Failed to find employee by email: ${error.message}`);
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
            throw new NotFoundException(`Error deleting employee with ID ${id}: ${error.message}`);
        }
        return { message: "Emp deleted successfully" }
    }
}
