import { BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Student } from "../student/schema/student.schema";
import { CreateMarkeDto } from "./dto/create.dto";
import { UpdateMarkDto } from "./dto/update.dto";
import { Marke } from "./schema/mark.schema";

export class MarkService {
    constructor(
        @InjectModel(Marke.name) private readonly markModel: Model<Marke>,
        @InjectModel(Student.name) private readonly studentModel: Model<Student>
    ) { }
    async createMarke(createDto: CreateMarkeDto, studentId: string) {
        try {

            const mark = await this.markModel.create({ ...createDto, studentId: studentId })
            return await mark.save();
        } catch (error) {
            console.log(error);

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
            const marke = await this.markModel.findById({ id: id })
            return marke;
        } catch (error) {

            throw new BadRequestException("No Mark found with ID: ${id}");
        }
    }


    async getMarkByStudentId(studentId: string) {
        try {
            const marke = await this.markModel.find({
                studentId: studentId
            }).exec();

            return marke;
        } catch (error) {
            throw new BadRequestException("No Mark found with ID: ${id}");
        }
    }

    async updateMark(id: number, course: UpdateMarkDto) {
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