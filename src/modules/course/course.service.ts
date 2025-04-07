import { BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCourseDto } from "./dto/create.dto";
import { UpdateCourseDto } from "./dto/update.dto";
import { Course } from "./schema/course.schema";

export class CourseService {
    constructor(
        @InjectModel(Course.name) private readonly courseModel: Model<Course>
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

    //! WE SHOULD MAKE CONTROLLER FOR THESE METHODS
    async getAllOpenCourse() {
        const courses = await this.courseModel.find({ isOpen: true }).exec();
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

    async getCourseTree(): Promise<any[]> {
        try {
          const tree = await this.courseModel.aggregate([
            {
              $match: { parent: null } // اختيار المواد الجذرية
            },
            {
              $graphLookup: {
                from: 'courses',          // تأكد من أن هذا الاسم يتطابق مع اسم المجموعة (collection) في MongoDB
                startWith: '$_id',
                connectFromField: '_id',
                connectToField: 'parent',
                as: 'children'
              }
            }
          ]).exec();
          return tree;
        } catch (error) {
          throw new BadRequestException("Error retrieving course tree");
        }
      }
      
}