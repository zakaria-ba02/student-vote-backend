import { BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateStudentDto } from "./dtos/create.dto";
import { UpdateStudentDto } from "./dtos/update.dto";
import { Student } from "./schema/student.schema";
import * as bcrypt from 'bcryptjs'

export class StudentService {
    constructor(
        @InjectModel(Student.name) private readonly studentModel: Model<Student>
    ) { }
    async createStudent(createStudentDto: CreateStudentDto) {
        try {

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(createStudentDto.password, salt);
            createStudentDto.password = hashPassword;
            const student = await this.studentModel.create(createStudentDto)
        } catch (error) {
            throw new BadRequestException("Error in Creating Studing");
        }
    }
    
    async findAllStudent() {
        try {
            const students = await this.studentModel.find({}).exec();
            return students;
        } catch (error) {
            throw new BadRequestException("No student found ");
        }
        
    }

    async findStudentById(id: string) {
        try {
            const student = await this.studentModel.findById(id).exec();
            return student;
        } catch (error) {

            throw new BadRequestException("No student found with ID: ${id}");
        }
        
    }
    
    async findByUniversityId(universityId: number): Promise<Student | null> {
        try {
            return this.studentModel.findOne({ universityId });
        } catch (error) {
            throw new BadRequestException("No student found with UniversityId: ${id}");
        }
      }

    async updateStudent(id: string, student: UpdateStudentDto) {
        try {
            await this.studentModel.findByIdAndUpdate(id, student)
        } catch (error) {
            throw new BadRequestException("Failed to update student with ID: ${id}: ${error.message}");
        }
        return { message: "Student updated successfully" }
    }

    async deleteStudent(id: string) {
        try {
            await this.studentModel.findByIdAndDelete(id)
        } catch (error) {
            throw new BadRequestException("Failed to delete student with ID: ${id}: ${error.message}");
        }
        return { message: "Student deleted successfully" }
    }




    

}