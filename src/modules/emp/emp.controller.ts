import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CreateEmpDto } from "./dtos/create.dto";
import { UpdateEmDto } from "./dtos/update.dto";
import { EmpService } from "./emp.service";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";

UseGuards(JwtAuthGuard)
@Controller("emp")
export class EmpController {
    constructor(
        private readonly empService: EmpService
    ) { }

    @Post("create")
    async createEmp(@Body() createDto: CreateEmpDto) {
        return await this.empService.createEmp(createDto);
    }
    @Get("find-all")
    async getAll() {
        return await this.empService.getAllEmp();
    }

    @Get("find-byid/:id")
    async getEmpById(@Param("id") id: string) {
        const emp = await this.empService.getEmpById(id);
        return emp;
    }
    @Patch("update/:id")
    async updateStudent(@Body() updateEmpDto:UpdateEmDto,@Param("id")id:string ) {
        return await this.empService.updateEmp(id,updateEmpDto);
    }
  
    @Delete('delete/:id')
    async deleteEmp(@Param('id') id: string) {
        return await this.empService.deleteEmp(id);
    }
}