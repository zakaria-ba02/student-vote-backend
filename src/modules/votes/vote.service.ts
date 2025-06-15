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
      // Fetch all votes with populated course and student data
      const votes = await this.voteModel
        .find({})
        .populate({
          path: "courseId",
          select: "name courseCode",
        })
        .populate({
          path: "studentId",
          select: "name universityId completedHours",
        })
        .exec();

      // Group votes by courseId manually
      const courseVoteMap = new Map<string, {
        courseId: string;
        courseName: string;
        courseCode: string;
        voteCount: number;
        voters: Array<{
          studentId: string;
          name: string;
          universityId: number;
          isGraduating: boolean;
        }>;
      }>();

      for (const vote of votes) {
        const course = vote.courseId as any; // Type assertion since populated
        const student = vote.studentId as any; // Type assertion since populated

        if (!course || !student) continue; // Skip if population failed

        const courseId = (vote as any).courseId._id.toString();
        const existing = courseVoteMap.get(courseId);

        if (!existing) {
          courseVoteMap.set(courseId, {
            courseId,
            courseName: course.name,
            courseCode: course.courseCode,
            voteCount: 1,
            voters: [
              {
                studentId: student._id.toString(),
                name: student.name,
                universityId: student.universityId,
                isGraduating: student.completedHours >= 150,
              },
            ],
          });
        } else {
          existing.voteCount += 1;
          existing.voters.push({
            studentId: student._id.toString(),
            name: student.name,
            universityId: student.universityId,
            isGraduating: student.completedHours >= 150,
          });
        }
      }

      // Convert map to array and calculate graduatingVotersCount
      const result = Array.from(courseVoteMap.values()).map(course => ({
        courseId: course.courseId,
        courseName: course.courseName,
        courseCode: course.courseCode,
        voteCount: course.voteCount,
        graduatingVotersCount: course.voters.filter(voter => voter.isGraduating).length,
        voters: course.voters,
      }));

      return result;
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