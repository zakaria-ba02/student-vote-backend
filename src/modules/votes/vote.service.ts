import { BadRequestException, ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Course } from "../course/schema/course.schema";
import { CreatVoteDto } from "./dto/creat.dto";
import { UpdateVoteDto } from "./dto/update.dto";
import { Vote } from "./schema/vote.schema";
import { Mark } from "../mark/schema/mark.schema";

export class VoteService {
    constructor(
        @InjectModel(Vote.name) private readonly voteModel: Model<Vote>,
        @InjectModel(Course.name) private readonly courseModel: Model<Course>,
        @InjectModel(Mark.name) private readonly markModel: Model<Mark>,

    ) { }

    async createVote(createDto: CreatVoteDto, studentId: string) {
        try {
            const courseIds = createDto.courseIds;

            if (!Array.isArray(courseIds) || courseIds.length < 4 || courseIds.length > 6) {
                throw new BadRequestException("You must vote for at least 4 and at most 6 courses.");
            }

            // Fetch all relevant courses
            const objectIds = courseIds.map(id => new Types.ObjectId(id));
            const courses = await this.courseModel.find({
                _id: { $in: objectIds },
                // isOpen: true,
                isVotingOpen: true
            });

            if (courses.length !== courseIds.length) {
                throw new BadRequestException("One or more courses not found or not open for voting.");
            }

            const now = new Date();
            for (const course of courses) {
                if (!course.votingStart || !course.votingEnd || now < course.votingStart || now > course.votingEnd) {
                    throw new BadRequestException(`Voting is not currently open for course ${course._id}`);
                }

                const existingVote = await this.voteModel.findOne({
                    studentId: studentId,
                    courseId: course._id,
                    createdAt: { $gte: course.votingStart, $lte: course.votingEnd }
                });
                const mark = await this.markModel.findOne({ studentId, courseId: course._id.toString() })
                if (mark && mark.mark >= 50) {
                    throw new ConflictException(`Already passed for this course ${course._id}`);
                } else if (existingVote) {
                    throw new ConflictException(`Already voted for course ${course._id}`);
                }

            }

            // Create votes
            const votesToCreate = courseIds.map(courseId => ({
                courseId,
                studentId
            }));

            await this.voteModel.insertMany(votesToCreate);

            return { message: "Votes submitted successfully" };

        } catch (error) {
            throw error;
        }
    }

       async getAllVote() {
        try {
            const voteAggregation = await this.voteModel.aggregate([
                {
                    $group: {
                        _id: "$courseId",
                        voteCount: { $sum: 1 },
                        voters: { $push: "$studentId" }
                    }
                },
                {
                    $lookup: {
                        from: "courses",
                        localField: "_id",
                        foreignField: "_id",
                        as: "courseInfo"
                    }
                },
                {
                    $unwind: "$courseInfo"
                },
                {
                    $lookup: {
                        from: "students",
                        localField: "voters",
                        foreignField: "_id",
                        as: "voterInfo"
                    }
                },
                {
                    $project: {
                        courseId: "$_id",
                        courseName: "$courseInfo.name",
                        courseCode: "$courseInfo.courseCode",
                        voteCount: 1,
                        graduatingVotersCount: {
                            $size: {
                                $filter: {
                                    input: "$voterInfo",
                                    as: "student",
                                    cond: { $gte: ["$$student.completedHours", 150] }
                                }
                            }
                        },
                        voters: {
                            $map: {
                                input: "$voterInfo",
                                as: "student",
                                in: {
                                    studentId: "$$student._id",
                                    name: "$$student.name",
                                    universityId: "$$student.universityId",
                                    isGraduating: { $gte: ["$$student.completedHours", 150] }
                                }
                            }
                        }
                    }
                }
            ]);

            return voteAggregation;
        } catch (error) {
            throw new NotFoundException(`Votes not found: ${error.message}`);
        }
    }


    //جلب الاصوات على مادة معينة
    async getAllVotedCourse(courseId: string, startDate: Date, endDate: Date) {
        try {
            const votes = await this.voteModel.find({
                courseId,
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            }).exec();

            return votes;
        } catch (error) {
            console.error('Error in findAllVotedCourse:', error);
            // Or 2. Throw a more specific exception
            throw new InternalServerErrorException('Failed to retrieve voting data');
        }
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
            throw new NotFoundException(`Error updating vote: ${error.message}`);
        }
        return { message: "Vote updated successfully" }
    }
    async deleteVote(id: string) {
        try {
            await this.voteModel.findByIdAndDelete(id)
        } catch (error) {
            throw new NotFoundException(`Error deleting vote: ${error.message}`);
        }
        return { message: "vote deleted successfully" }
    }


    async openVoting(courseId: string, startDate: Date, endDate: Date) {
        try {
            const course = await this.courseModel.findById(courseId);
            if (!course) throw new BadRequestException("Course not found");

            course.isVotingOpen = true;
            course.votingStart = startDate;
            course.votingEnd = endDate;
            return await course.save();
        } catch (error) {
            // You can log the error here if needed
            console.error('Error in openVoting:', error);
            // Re-throw the error or handle it as appropriate for your application
            throw error;
        }
    }

    async closeVoting(courseId: string) {
        try {
            const course = await this.courseModel.findById(courseId);
            if (!course) throw new BadRequestException("Course not found");

            course.isVotingOpen = false;
            return await course.save();
        } catch (error) {
            // You can log the error here if needed
            console.error('Error in closeVoting:', error);
            // Re-throw the error or handle it as appropriate for your application
            throw error;
        }
    }
}