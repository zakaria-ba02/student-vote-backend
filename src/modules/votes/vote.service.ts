import { BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { console } from "inspector/promises";
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


    async createVote(createDto: CreatVoteDto, studentId: string) {
        try {
            console.log({ ...createDto, studentId: studentId });
            console.log("Hello");
            
            const objectId = new Types.ObjectId(createDto.courseId);
            const course = await this.courseModel.findById(objectId);
            if (!course) {
                throw new BadRequestException("Course with ID not found")
            }
            const vote = await this.voteModel.create({ ...createDto, studentId: studentId });
            return await vote.save();
        } catch (error) {
            throw new BadRequestException("Error in voting ")
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

    async getMyVotedCourse(studentId: string) {
        try {
            const vote = await this.voteModel.find({ studentId }).populate("courseId").exec();
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


    async startVoting() {
        try {
            await this.voteModel.updateMany({}, { isVotingOpen: true });
            return { message: "Voting has started successfully" };
        } catch (error) {
            throw new BadRequestException("Error in starting voting");
        }
    }
    
    async stopVoting() {
        try {
            await this.voteModel.updateMany({}, { isVotingOpen: false });
            return { message: "Voting has stopped successfully" };
        } catch (error) {
            throw new BadRequestException("Error in stopping voting");
        }
    }
    
}