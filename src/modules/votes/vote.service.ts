import { BadRequestException, ConflictException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Course } from "../course/schema/course.schema";
import { Student } from "../student/schema/student.schema";
import { CreatVoteDto } from "./dto/creat.dto";
import { UpdateVoteDto } from "./dto/update.dto";
import { Vote } from "./schema/vote.schema";

export class VoteService {
    constructor(
        @InjectModel(Vote.name) private readonly voteModel: Model<Vote>,
        @InjectModel(Course.name) private readonly courseModel: Model<Course>,
    ) { }

    // إنشاء تصويت جديد للطالب على مادة دراسية معينة  
    async createVote(createDto: CreatVoteDto, studentId: string) {
        try {
            console.log("HJ");
            console.log(createDto, studentId);

            const objectId = new Types.ObjectId(createDto.courseId);
            const course = await this.courseModel.findOne({
                _id: objectId,
                isOpen: true
            });
            if (!course) {
                throw new BadRequestException("Course with ID not found or not opened")
            }
            //التحقق من عدم التصويت
            const existVote = await this.voteModel.findOne({
                studentId: studentId,
                courseId: createDto.courseId
            });

            if (existVote) {
                throw new ConflictException("This Student is already vote")
            }
            // تحقق من فتح التصويت من قبل رئيس القسم
            if (!Course.isVotingOpen || !Course.votingStart || !Course.votingEnd) {
                throw new BadRequestException("Voting not available for this course yet");
            }

            const now = new Date();
            if (now < course.votingStart || now > course.votingEnd) {
                throw new BadRequestException("Voting is currently closed");
            }
            const vote = await this.voteModel.create({ ...createDto, studentId: studentId });
            return await vote.save();



        } catch (error) {
            throw error
        }



    }


    async getAllVote() {
        try {
            const vote = await this.voteModel.find({}).populate("studentId").populate("courseId").exec();
            return vote;
        } catch (error) {
            throw new BadRequestException("No Vote found ");
        }
    }

    //جلب الاصوات على مادة معينة
    async getAllVotedCourse(courseId: string, startDate: Date, endDate: Date) {
        return await this.voteModel.find({
            courseId,
            createdAt: {
                $gte: startDate,
                $lte: endDate
            }
        }).exec();
    }


    async getMyVotedCourse(studentId: string) {
        try {
            const vote = await this.voteModel.find({ studentId }).populate("courseId").sort({ createdAt: 1 }).limit(50).exec();
            return vote;

        } catch (error) {
            throw new BadRequestException("No Vote found ");
        }
    }
    async getVoteById(id: string) {
        try {
            const vote = await this.voteModel.findById(id)
            return vote;
        } catch (error) {

            throw new BadRequestException("No vote found with ID: ${id}");
        }

    }
    async updateVote(id: string, vote: UpdateVoteDto) {
        try {
            await this.voteModel.findByIdAndUpdate(id, vote)
        } catch (error) {
            throw new BadRequestException("Failed to update Vote with ID: ${id}: ${error.message}");
        }
        return { message: "Vote updated successfully" }
    }
    async deleteVote(id: string) {
        try {
            await this.voteModel.findByIdAndDelete(id)
        } catch (error) {
            throw new BadRequestException("Failed to delete vote with ID: ${id}: ${error.message}");
        }
        return { message: "vote deleted successfully" }
    }


    async openVoting(courseId: string, startDate: Date, endDate: Date) {
        const course = await this.courseModel.findById(courseId);
        if (!course) throw new BadRequestException("Course not found");

        course.isVotingOpen = true;
        course.votingStart = startDate;
        course.votingEnd = endDate;
        return await course.save();
    }

    async closeVoting(courseId: string) {
        const course = await this.courseModel.findById(courseId);
        if (!course) throw new BadRequestException("Course not found");

        course.isVotingOpen = false;
        return await course.save();
    }




}