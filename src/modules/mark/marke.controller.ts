import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { GetStudentId } from "src/common/decoraters";
import { Roles } from "src/common/decoraters/roles";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Role } from "../emp/enums/role.enum";
import { CreateMarkeDto } from "./dto/create.dto";
import { UpdateMarkDto } from "./dto/update.dto";
import { MarkService } from "./marke.service";

@Controller("mark")
@UseGuards(JwtAuthGuard,RolesGuard)
export class MarkController {
    constructor(
        private readonly markService: MarkService
    ) { }

    @Post()
    @Roles(Role.EMP)
    async createMark(@Body() createDto: CreateMarkeDto,@GetStudentId() studentId: string) {
        return await this.markService.createMarke(createDto,studentId);
    }



    @Get("get-my-marks")
    async getMyMarks(@GetStudentId() studentId: string) {
        return await this.markService.getMarkByStudentId(studentId);
    }
    @Get()
    async getAllMark() {
        return await this.markService.getAllMark();
    }

    @Get('find-by-id/:id')
    async getMarkById(@Param('id') id: string) {
        return await this.markService.getMarkById(id);
    }

    @Patch(':id')
    @Roles(Role.EMP)
    async updateMark(@Body() body: {
        id: number,
        updateDto: UpdateMarkDto
    }
    ) {
        return await this.markService.updateMark(body.id, body.updateDto);
    }

    @Delete(':id')
    async deleteMark(@Param('id') id: string) {
        return await this.markService.deleteMark(id);
    }

}