import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { YearEnum } from "src/common/enums/year.enum";
import { Mark } from "../mark/schema/mark.schema";
import { CreateCourseDto } from "./dto/create.dto";
import { UpdateCourseDto } from "./dto/update.dto";
import { Course } from "./schema/course.schema";

@Injectable()
export class CourseService {
    constructor(
        @InjectModel(Course.name) private readonly courseModel: Model<Course>,
        
    ) { }

    async createCourse(createDto: CreateCourseDto) {
        try {
            const prerequisites = await this.courseModel.find({
                courseCode: { $in: createDto.prerequisites || [] }
            }).select('courseCode').exec();

            const createdCourse = new this.courseModel({
                ...createDto,
                prerequisites: prerequisites.map(c => c.courseCode)
            });
            return createdCourse.save();
        } catch (error) {
            throw new BadRequestException(`Error creating course: ${error.message}`);
        }
    }
    async getAllCourse() {
        try {
            const course = await this.courseModel.find({}).populate('prerequisites').exec();
            return course;
        } catch (error) {
            throw new BadRequestException("Failed to fetch courses");
        }
    }

    async getAllOpenCourse(year: YearEnum) {
        try {
            return await this.courseModel.find({ isOpen: true, year }).exec();
        } catch (error) {
            throw new BadRequestException(`Failed to fetch open courses for year ${year}`);
        }
    }

    async openCourse(id: string, isOpen: boolean) {
        try {
            const course = await this.courseModel.findByIdAndUpdate(
                id,
                { isOpen },
                { new: true }
            );
            if (!course) throw new NotFoundException(`Course with ID ${id} not found`);
            return course;
        } catch (error) {
            throw new BadRequestException(`Failed to update course status: ${error.message}`);
        }
    }


    async getCourseById(id: string) {
        try {
            const course = await this.courseModel.findById(id).populate('prerequisites').exec();
            if (!course) throw new NotFoundException(`No course found with ID: ${id}`);
            return course;
        } catch (error) {
            throw new BadRequestException(`Failed to fetch course with ID ${id}: ${error.message}`);
        }
    }

    async updateCourse(id: string, course: UpdateCourseDto) {
        try {
            await this.courseModel.findByIdAndUpdate(id, course, { upsert: true }).exec()
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
        try {
            return await this.courseModel.updateMany({ year }, {
                isOpen: true
            }).exec();
        } catch (error) {
            throw new BadRequestException(`Failed to open Course with year: ${year}: ${error.message}`);
        }
    }

    async getPrerequisites(courseCode: string): Promise<Course[]> {
        try {
            const course = await this.courseModel.findOne({ courseCode })
                .populate('prerequisites')
                .exec();

            if (!course) throw new NotFoundException(`Course with code ${courseCode} not found`);
            return course?.prerequisites as Course[] || [];
        } catch (error) {
            throw new BadRequestException(`Failed to get prerequisites: ${error.message}`)
        }
    }

}