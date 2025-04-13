import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { GetStudentId } from "src/common/decoraters";
import { Roles } from "src/common/decoraters/roles";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { Role } from "../emp/enums/role.enum";
import { CreatVoteDto } from "./dto/creat.dto";
import { UpdateVoteDto } from "./dto/update.dto";
import { VoteService } from "./vote.service";



@UseGuards(JwtAuthGuard)
@Controller("votes")
export class VoteController {
    constructor(private readonly voteService: VoteService) { }

    @Post()
    async createVote(@Body() createVoteDto: CreatVoteDto, @GetStudentId() studentId: string) {
        return await this.voteService.createVote(createVoteDto, studentId);
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
    @Patch(":id")
    async updateVote(@Body() updateVoteDto: UpdateVoteDto, @Param("id") id: string) {
        return await this.voteService.updateVote(id, updateVoteDto);
    }
    @Delete(":id")
    async deleteStudent(@Param("id") id: string) {
        return await this.voteService.deleteVote(id);
    }

    @Roles(Role.ADMIN) // السماح فقط لرئيس القسم
    @Post("start-voting")
    async startVoting() {
        return await this.voteService.startVoting();
    }


    @Roles(Role.ADMIN)
    @Post("stop-voting")
    async stopVoting() {
        return await this.voteService.stopVoting();
    }
}
