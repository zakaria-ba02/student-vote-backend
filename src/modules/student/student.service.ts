import { BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateStudentDto } from "./dtos/create.dto";
import { UpdateStudentDto } from "./dtos/update.dto";
import { Student } from "./schema/student.schema";
import * as bcrypt from 'bcryptjs'
import { Course } from "../course/schema/course.schema";
import { Mark } from "../mark/schema/mark.schema";
import { CourseService } from "../course/course.service";
import { gpaMark } from "src/common/helpers/gpa-marks";
import { YearEnum } from "src/common/enums/year.enum";


export class StudentService {
    constructor(
        @InjectModel(Student.name) private readonly studentModel: Model<Student>,
        @InjectModel(Course.name) private readonly courseModel: Model<Course>,
        @InjectModel(Mark.name) private readonly markModel: Model<Mark>,
        private readonly courseService: CourseService, // استخدام CourseService
    ) { }
    async createStudent(createStudentDto: CreateStudentDto) {
        try {

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(createStudentDto.password, salt);
            createStudentDto.password = hashPassword;
            const student = await this.studentModel.create(createStudentDto)
            return await student.save()
        } catch (error) {
            throw new BadRequestException(`Failed to create student with id: {id}: ${error.message}`);
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
            throw new NotFoundException(`Student with ID ${id} not found`);
        }

    }
    async findStudentByName(name: string) {
        try {
            const student = await this.studentModel.find({ name: { $regex: name, $options: 'i' } }).exec();
            return student;
        } catch (error) {

            throw new BadRequestException("No student found with ID: ${name}");
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
            throw new BadRequestException(`Failed to update student with ID: ${id}: ${error.message}`);
        }
        return { message: "Student updated successfully" }
    }

    async deleteStudent(id: string) {
        try {
            await this.studentModel.findByIdAndDelete(id)
        } catch (error) {
            throw new BadRequestException(`Failed to delete student with ID: ${id}: ${error.message}`);
        }
        return { message: "Student deleted successfully" }
    }


    async calculateSemesterGPA(studentId: string, year: YearEnum, semester: number): Promise<number> {
        try {
            // Validate inputs
            if (!studentId || !year || semester === undefined) {
                throw new BadRequestException('Missing required parameters');
            }

            // Retrieve student marks
            const marks = await this.markModel.find({ studentId }).exec();

            // Filter passed marks (>= 50)
            const passedMarks = marks.filter(mark => mark.mark >= 50);

            // Retrieve courses info for passed subjects
            const courseIds = passedMarks.map(mark => mark.courseId);
            const courses = await this.courseModel.find({
                _id: { $in: courseIds },
                year,
                semester
            }).exec();

            // Calculate semester GPA
            let totalCredits = 0;
            let weightedSum = 0;

            passedMarks.forEach(mark => {
                const course = courses.find(c => c._id.toString() === mark.courseId.toString());
                if (course) {
                    totalCredits += course.creditHours;
                    const gpa = gpaMark(mark.mark);
                    weightedSum += gpa.point * course.creditHours;

                    console.log(`POINT: ${gpa.point} with mark: ${mark.mark}`);
                    console.log(`Total: ${totalCredits} weightedSum: ${weightedSum}`);
                }
            });

            if (totalCredits === 0) {
                return 0; // No passed courses
            }

            return weightedSum / totalCredits;

        } catch (error) {
            console.error(`Error calculating semester GPA for student ${studentId}:`, error);
            throw new InternalServerErrorException('Failed to calculate semester GPA');


        }
    }

    // حساب المعدل التراكمي (بمراعاة المواد الناجحة فقط)
    async calculateCumulativeGPA(studentId: string): Promise<number> {
        try {
            // Validate input
            if (!studentId) {
                throw new BadRequestException('Student ID is required');
            }

            // Retrieve all marks
            const allMarks = await this.markModel.find({ studentId }).exec();

            // Filter passed marks (>= 50)
            const passedMarks = allMarks.filter(mark => mark.mark >= 50);

            // Retrieve courses info
            const courseIds = passedMarks.map(mark => mark.courseId);
            const courses = await this.courseModel.find({ _id: { $in: courseIds } }).exec();

            // Calculate cumulative GPA
            let totalCredits = 0;
            let weightedSum = 0;

            passedMarks.forEach(mark => {
                const course = courses.find(c => c._id.toString() === mark.courseId.toString());
                if (course) {
                    totalCredits += course.creditHours;
                    weightedSum += gpaMark(mark.mark).point * course.creditHours;
                }
            });

            if (totalCredits === 0) {
                return 0; // No passed courses
            }

            return weightedSum / totalCredits;

        } catch (error) {
            console.error(`Error calculating cumulative GPA for student ${studentId}:`, error);
            // Alternative options:
            throw new InternalServerErrorException('Failed to calculate cumulative GPA');
        }
    }
}