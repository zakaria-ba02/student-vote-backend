import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { GetStudentId } from "src/common/decoraters";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { CreateMarkeDto } from "./dto/create.dto";
import { UpdateMarkDto } from "./dto/update.dto";
import { MarkService } from "./marke.service";

@Controller("mark")
@UseGuards(JwtAuthGuard)
export class MarkController {
    constructor(
        private readonly markService: MarkService
    ) { }

    @Post()
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