import { BadRequestException } from "@nestjs/common";
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


    async calculateSemesterGPA(studentId: string, year: YearEnum, semester: number): Promise<number> {
        // استرجاع العلامات للطالب
        const marks = await this.markModel.find({ studentId }).exec();
        // استرجاع المواد التي تم اجتيازها (علامة فوق 50)
        const passedMarks = marks.filter(mark => mark.mark >= 50);

        // استرجاع الساعات المعتمدة الخاصة بكل مادة
        const courseIds = passedMarks.map(mark => mark.courseId);
        const courses = await this.courseModel.find({ _id: { $in: courseIds }, year, semester: semester }).exec();

        // حساب المعدل الفصلي
        let totalCredits = 0;
        let weightedSum = 0;

        passedMarks.forEach(mark => {
            const course = courses.find(course => course._id.toString() === mark.courseId.toString());
            if (course) {
                totalCredits += course.creditHours;
                weightedSum += gpaMark(mark.mark).point * course.creditHours;
                console.log("POINT :", gpaMark(mark.mark).point, "with mark :", mark.mark);

                console.log("Total :", totalCredits, "weightedSum :", weightedSum);

            }
        });

        if (totalCredits === 0) {
            return 0; // إذا لم يكن هناك مواد ناجحة
        }

        return weightedSum / totalCredits;
    }

    // حساب المعدل التراكمي (بمراعاة المواد الناجحة فقط)
    async calculateCumulativeGPA(studentId: string): Promise<number> {
        const allMarks = await this.markModel.find({ studentId }).exec();

        // استرجاع العلامات للمواد الناجحة فقط
        const passedMarks = allMarks.filter(mark => mark.mark >= 50);


        // استرجاع الساعات المعتمدة الخاصة بكل مادة
        const courseIds = passedMarks.map(mark => mark.courseId);
        const courses = await this.courseModel.find({ _id: { $in: courseIds } }).exec();


        let totalCredits = 0;
        let weightedSum = 0;

        passedMarks.forEach(mark => {
            const course = courses.find(course => course._id.toString() === mark.courseId.toString());
            if (course) {
                totalCredits += course.creditHours;
                weightedSum += gpaMark(mark.mark).point * course.creditHours;
            }
        });

        if (totalCredits === 0) {
            return 0; // إذا لم يكن هناك مواد ناجحة
        }

        return weightedSum / totalCredits;
    }
}