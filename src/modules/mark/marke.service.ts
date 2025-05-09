import { BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Student } from "../student/schema/student.schema";
import { CreateMarkDto } from "./dto/create.dto";
import { UpdateMarkDto } from "./dto/update.dto";
import { Mark } from "./schema/mark.schema";
import { Course } from "../course/schema/course.schema";
import { academicHours } from "src/common/helpers/academic-hours";
import { StudentService } from "../student/student.service";
import { BulkImportMarkDto } from "./dto/bulk-import-mark.dto";

export class MarkService {
    constructor(
        @InjectModel(Mark.name) private readonly markModel: Model<Mark>,
        @InjectModel(Student.name) private readonly studentModel: Model<Student>,
        @InjectModel(Course.name) private readonly courseModel: Model<Course>,
        private readonly studentService: StudentService
    ) { }
    async createMark(createDto: CreateMarkDto, studentId: string) {
        try {

            const mark = await this.markModel.create({ ...createDto, studentId: studentId })
            return await mark.save();
        } catch (error) {
            throw new BadRequestException(`Error creating mark: ${error.message}`);
        }
    }
    async bulkImportMarks(createDtos: BulkImportMarkDto[]) {
        try {
            const results = [];

            for (const createDto of createDtos) {
                try {
                    // Validate course exists
                    const course = await this.courseModel.findById(createDto.courseId);
                    if (!course) {
                        results.push({
                            studentId: createDto.studentId,
                            courseId: createDto.courseId,
                            success: false,
                            message: "Course not found"
                        });
                        continue;
                    }

                    // Validate student exists
                    const student = await this.studentModel.findById(createDto.studentId);
                    if (!student) {
                        results.push({
                            studentId: createDto.studentId,
                            courseId: createDto.courseId,
                            success: false,
                            message: "Student not found"
                        });
                        continue;
                    }

                    // Check if mark already exists for this student/course/type
                    const existingMark = await this.markModel.findOne({
                        studentId: createDto.studentId,
                        courseId: createDto.courseId,
                        type: createDto.type
                    });

                    if (existingMark) {
                        results.push({
                            studentId: createDto.studentId,
                            courseId: createDto.courseId,
                            success: false,
                            message: "Mark already exists for this student/course/type combination"
                        });
                        continue;
                    }

                    // Create new mark
                    const mark = await this.markModel.create(createDto);

                    // Update student's completed hours and GPA if mark is passing
                    if (createDto.mark >= 50) {
                        student.completedHours += course.creditHours;
                        student.academicStatus = academicHours(student.completedHours);
                        student.cumulativeGPA = await this.studentService.calculateCumulativeGPA(createDto.studentId);
                        await student.save();
                    }

                    results.push({
                        studentId: createDto.studentId,
                        courseId: createDto.courseId,
                        success: true,
                        markId: mark._id,
                        updatedHours: student.completedHours,
                        newGPA: student.cumulativeGPA
                    });

                } catch (error) {
                    results.push({
                        studentId: createDto.studentId,
                        courseId: createDto.courseId,
                        success: false,
                        message: error.message
                    });
                }
            }

            return {
                message: "Bulk import process completed",
                results: results
            };

        } catch (error) {
            throw new BadRequestException("Error in bulk import: " + error.message);
        }
    }

    async getAllMark() {
        try {
            const mark = await this.markModel.find({}).populate("studentId", "name").populate("courseId").exec();
            return mark;
        } catch (error) {
            console.error('Error in getAllMark:', error);
            throw new BadRequestException(`Failed to fetch marks: ${error.message}`);
        }
    }

    async getMarkById(id: string) {
        try {
            const mark = await this.markModel.findById({ id: id })
            return mark;
        } catch (error) {
            console.error('Error in getMarkById:', error);
            throw new BadRequestException(`No mark found with ID: ${id}. Error: ${error.message}`);
        }
    }


    async getMarkByStudentId(studentId: string) {
        try {
            const mark = await this.markModel.find({
                studentId: studentId
            }).exec();

            return mark;
        } catch (error) {
            console.error('Error in getMarkByStudentId:', error);
            throw new BadRequestException(`No mark found for student ID: ${studentId}. Error: ${error.message}`);
        }
    }

    async updateMark(id: string, course: UpdateMarkDto) {
        try {
            await this.markModel.findByIdAndUpdate(id, course)
        } catch (error) {
            console.error('Error in updateMark:', error);
            throw new BadRequestException(`Failed to update mark with ID: ${id}. Error: ${error.message}`);
        }
        return { message: " updated Mark successfully" }
    }

    async deleteMark(id: string) {
        try {
            if (!id) {
                throw new BadRequestException('Mark ID is required');
            }

            const mark = await this.markModel.findByIdAndDelete(id);

            if (!mark) {
                throw new NotFoundException(`Mark with ID ${id} not found`);
            }

            return {
                message: "Mark deleted successfully",
                deletedId: id
            };
        } catch (error) {
            console.error('Error in deleteMark:', error);
            throw new BadRequestException(`Failed to delete mark with ID: ${id}. Error: ${error.message}`);
        }
    }
}