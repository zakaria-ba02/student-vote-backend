import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { YearEnum } from "src/common/enums/year.enum";
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
            const courses = await this.courseModel.find({})
                .populate('prerequisites')
                .exec();
    
            if (!courses || courses.length === 0) {
                throw new BadRequestException('No courses found');
            }
    
            return courses;
        } catch (error) {
            console.error('Error in getAllCourse:', error);
            throw new BadRequestException(`Failed to fetch courses: ${error.message}`);
        }
    }

    async getAllOpenCourse(year: YearEnum) {
        try {
            const courses = await this.courseModel.find({ isOpen: true, year }).exec();
    
            if (!courses || courses.length === 0) {
                throw new BadRequestException(`No open courses found for year ${year}`);
            }
    
            return courses;
        } catch (error) {
            console.error(`Error in getAllOpenCourse for year ${year}:`, error);
            throw new BadRequestException(`Failed to fetch open courses for year ${year}: ${error.message}`);
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
            const updated = await this.courseModel.findByIdAndUpdate(id, course, { new: true });
    
            if (!updated) {
                throw new BadRequestException(`Course with ID ${id} not found`);
            }
    
            return { message: "Course updated successfully", updatedCourse: updated };
        } catch (error) {
            console.error(`Error updating course with ID ${id}:`, error);
            throw new BadRequestException(`Failed to update course with ID ${id}: ${error.message}`);
        }
    }
    

    async deleteCourse(id: string) {
        try {
            const deleted = await this.courseModel.findByIdAndDelete(id);
    
            if (!deleted) {
                throw new BadRequestException(`Course with ID ${id} not found`);
            }
    
            return { message: "Course deleted successfully", deletedCourse: deleted };
        } catch (error) {
            console.error(`Error deleting course with ID ${id}:`, error);
            throw new BadRequestException(`Failed to delete course with ID ${id}: ${error.message}`);
        }
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