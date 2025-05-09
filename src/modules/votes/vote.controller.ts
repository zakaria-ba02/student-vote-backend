import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { GetStudentId } from "src/common/decoraters";
import { Roles } from "src/common/decoraters/roles";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Role } from "../emp/enums/role.enum";
import { CreatVoteDto } from "./dto/creat.dto";
import { UpdateVoteDto } from "./dto/update.dto";
import { VoteService } from "./vote.service";



@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("votes")
export class VoteController {
    constructor(private readonly voteService: VoteService) { }

    // @Roles(Role.STUDENT)
    // @Post("create-vote")
    // async createVote(@Body() createVoteDto: CreatVoteDto, @GetStudentId() studentId: string) {
    //     return await this.voteService.createVote(createVoteDto, studentId);
    // }
    @Post("create-vote")
    async createVote(@Body() createVoteDto: CreatVoteDto, @GetStudentId() studentId: string) {
        return this.voteService.createVote(createVoteDto, studentId);
    }

    
    @Get("find-my-voted")
    async getMyVotedCourse(@GetStudentId() studentId: string) {
        return await this.voteService.getMyVotedCourse(studentId);
    }

    @Get("find-all")
    async getAllVotes() {
        return this.voteService.getAllVote();
    }

    @Get("find-by-id/:id")
    async getVoteById(@Param("id") id: string) {
        const vote = await this.voteService.getVoteById(id);
        return vote;
    }

    @Get('course-votes')
    async getAllVotedCourse(
        @Query('courseId') courseId: string,
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string
    ) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        return await this.voteService.getAllVotedCourse(courseId, start, end);

    }


    @Roles(Role.STUDENT)
    @Patch("update/:id")
    async updateVote(@Body() updateVoteDto: UpdateVoteDto, @Param("id") id: string) {
        return await this.voteService.updateVote(id, updateVoteDto);
    }

    @Patch("open-voting/:id")
    @Roles(Role.ADMIN) 
    async openVoting(
        @Param("id") courseId: string,
        @Query("startDate") startDate: string,
        @Query("endDate") endDate: string
    ) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return this.voteService.openVoting(courseId, start, end);
    }


    @Patch("close-voting/:id")
    @Roles(Role.ADMIN)
    async closeVoting(@Param("id") courseId: string) {
        return this.voteService.closeVoting(courseId);
    }
    

    @Roles(Role.STUDENT)
    @Delete("delete/:id")
    async deleteVote(@Param("id") id: string) {
        return await this.voteService.deleteVote(id);
    }


    

    

    


}