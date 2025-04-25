import { BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Student } from "../student/schema/student.schema";
import { CreateMarkDto } from "./dto/create.dto";
import { UpdateMarkDto } from "./dto/update.dto";
import { Mark } from "./schema/mark.schema";

export class MarkService {
    constructor(
        @InjectModel(Mark.name) private readonly markModel: Model<Mark>,
        @InjectModel(Student.name) private readonly studentModel: Model<Student>
    ) { }
    async createMark(createDto: CreateMarkDto, studentId: string) {
        try {

            const mark = await this.markModel.create({ ...createDto, studentId: studentId })
            return await mark.save();
        } catch (error) {

            throw new BadRequestException("Error in Creating Mark");
        }
    }

    async getAllMark() {
        try {
            const mark = await this.markModel.find({}).populate("studentId", "name").populate("courseId").exec();
            return mark;
        } catch (error) {
            throw new BadRequestException("No Mark found ");
        }
    }

    async getMarkById(id: string) {
        try {
            const mark= await this.markModel.findById({ id: id })
            return mark;
        } catch (error) {

            throw new BadRequestException("No Mark found with ID: ${id}");
        }
    }


    async getMarkByStudentId(studentId: string) {
        try {
            const mark = await this.markModel.find({
                studentId: studentId
            }).exec();

            return mark;
        } catch (error) {
            throw new BadRequestException("No Mark found with ID: ${id}");
        }
    }

    async updateMark(id: string, course: UpdateMarkDto) {
        try {
            await this.markModel.findByIdAndUpdate(id, course)
        } catch (error) {
            throw new BadRequestException("Failed to update Mark with ID: ${id}: ${error.message}");
        }
        return { message: " updated Mark successfully" }
    }

    async deleteMark(id: string) {
        try {
            await this.markModel.findByIdAndDelete(id)
        } catch (error) {
            throw new BadRequestException("Failed to delete Mark with ID: ${id}: ${error.message}");
        }
        return { message: "Mark deleted successfully" }
    }
}