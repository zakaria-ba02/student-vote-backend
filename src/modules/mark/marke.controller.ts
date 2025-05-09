import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { GetStudentId } from "src/common/decoraters";
import { Roles } from "src/common/decoraters/roles";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import { Role } from "../emp/enums/role.enum";
import { CreateMarkDto } from "./dto/create.dto";
import { UpdateMarkDto } from "./dto/update.dto";
import { MarkService } from "./marke.service";
import { BulkImportMarkDto } from "./dto/bulk-import-mark.dto";


@Controller("mark")
@UseGuards(JwtAuthGuard, RolesGuard)
export class MarkController {
    constructor(
        private readonly markService: MarkService
    ) { }

    // @Post("create-marks")
    // // @Roles(Role.EMP)
    // async createMark(@Body() createDto: CreateMarkDto, @GetStudentId() studentId: string) {
    //     return await this.markService.createMark(createDto, studentId);
    // }
    @Roles(Role.EMP)
    @Post('bulk-import')
    async bulkImport(@Body() bulkImportDto: BulkImportMarkDto[]) {
        return this.markService.bulkImportMarks(bulkImportDto);
    }


    @Roles(Role.EMP, Role.STUDENT)
    @Get("get-my-marks")
    async getMyMarks(@GetStudentId() studentId: string) {
        return await this.markService.getMarkByStudentId(studentId);
    }

    @Roles(Role.EMP, Role.STUDENT)
    @Get("get-all-marks")
    async getAllMark() {
        return await this.markService.getAllMark();
    }

    @Roles(Role.EMP, Role.STUDENT)
    @Get('find-by-id/:id')
    async getMarkById(@Param('id') id: string) {
        return await this.markService.getMarkById(id);
    }

    @Patch('update/:id')
    @Roles(Role.EMP)
    async updateMark(@Body() body: {
        id: string,
        updateDto: UpdateMarkDto
    }
    ) {
        return await this.markService.updateMark(body.id, body.updateDto);
    }

    @Roles(Role.EMP)
    @Delete('delete/:id')
    async deleteMark(@Param('id') id: string) {
        return await this.markService.deleteMark(id);
    }

}