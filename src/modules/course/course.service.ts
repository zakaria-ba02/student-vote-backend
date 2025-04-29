import { BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { YearEnum } from "src/common/enums/year.enum";
import { Marke } from "../mark/schema/mark.schema";
import { CreateCourseDto } from "./dto/create.dto";
import { UpdateCourseDto } from "./dto/update.dto";
import { Course } from "./schema/course.schema";

export class CourseService {
    constructor(
        @InjectModel(Course.name) private readonly courseModel: Model<Course>,
        @InjectModel(Marke.name) private readonly markModel: Model<Marke>,
    ) { }


    async createCourse(createDto: CreateCourseDto) {
        try {

            const course = await this.courseModel.create(createDto);
            return await course.save();
        } catch (error) {
            console.log(error);
            throw new BadRequestException("Error in Creating Course");
        }
    }
    async getAllCourse() {
        try {
            const course = await this.courseModel.find({});
            return course;
        } catch (error) {
            throw new BadRequestException("No course found ");
        }
    }

    async getAllOpenCourse(year: YearEnum) {
        const courses = await this.courseModel.find({ isOpen: true, year }).exec();
        return courses;
    }
    async openCourse(id: string, isOpen: boolean) {
        const course = await this.courseModel.findByIdAndUpdate(id, { isOpen: isOpen }, { upsert: true, new: true });
        return course;
    }


    async getCourseById(id: string) {
        try {
            const course = await this.courseModel.findById(id)
            return course;
        } catch (error) {

            throw new BadRequestException("No Course found with ID: ${id}");
        }
    }

    async updateCourse(id: string, course: UpdateCourseDto) {
        try {
            await this.courseModel.findByIdAndUpdate(id, course, { upsert: true })
        } catch (error) {
            throw new BadRequestException("Failed to update Course with ID: ${id}: ${error.message}");
        }
        return { message: " updated Course successfully" }
    }

    async deleteCourse(id: string) {
        try {
            await this.courseModel.findByIdAndDelete(id)
        } catch (error) {
            throw new BadRequestException("Failed to delete Course with ID: ${id}: ${error.message}");
        }
        return { message: "Course deleted successfully" }
    }



    //فتح المادة حسب السنة
    async openCourseOfYear(year: YearEnum) {
        return await this.courseModel.updateMany({ year }, {
            isOpen: true
        }).exec();
    }

    // إرجاع قائمة المواد الدراسية المتاحة للطالب بناءً على السنة 
    // async getAvaiableOpenCourseForStudent(year: YearEnum,studentId:string) {
    //     const courses = await this.courseModel.find({
    //         year: { $lte: year },
    //         isOpen: true
    //     }).exec();
    //     let courseIds = courses.map(c => c._id);
    //     //جلب المواد الراسبة او التي لم يجتازها
    //     courseIds=courseIds.filter(async (c:string)=>{
    //       return await  this.prerequestiesService.checkCourseIsAvaibale(c,studentId);
    //     })
    //     const avaibleCourses = await this.courseModel.find({
    //         _id: { $in: courseIds }
    //     }).exec();
    //     return avaibleCourses;
    // }
}