import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateEmpDto } from "./dtos/create.dto";
import { UpdateEmDto } from "./dtos/update.dto";
import { EmpService } from "./emp.service";

@Controller("emp")
export class EmpController {
    constructor(
        private readonly empService: EmpService
    ) { }

    @Post()
    async createEmp(@Body() createDto: CreateEmpDto) {
        return await this.empService.createEmp(createDto);
    }
    @Get()
    async getAll() {
        return await this.empService.getAllEmp();
    }

    @Get(":id")
    async getEmpById(@Param("id") id: string) {
        const emp = await this.empService.getEmpById(id);
        return emp;
    }
    @Patch(":id")
    async updateStudent(@Body() updateEmpDto:UpdateEmDto,@Param("id")id:string ) {
        return await this.empService.updateEmp(id,updateEmpDto);
    }
  
    @Delete(':id')
    async deleteEmp(@Param('id') id: string) {
        return await this.empService.deleteEmp(id);
    }
}