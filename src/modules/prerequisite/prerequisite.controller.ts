import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreatPrerDto } from "./dto/create.dto";
import { UpdatEPrerDto } from "./dto/update.dto";
import { PrerService } from "./prerequisite.service";

@Controller("Prer")
export class PrerController {
    constructor(private readonly PrerService: PrerService) { }

    @Post()

    async createPrer(@Body() createDto: CreatPrerDto) {
        return await this.PrerService.createPrer(createDto);
    }

    @Get()
    async getAllPrer() {
        return await this.PrerService.getAllPrer();
    }

    @Get(':id')
    async getPrerById(@Param('id') id: string) {
        return await this.PrerService.getPrerById(id);
    }

    @Patch(':id')
    async updatePrer(@Body() updatePrerDto:UpdatEPrerDto,@Param("id")id:string
    ) {
        return await this.PrerService.updatePrer(id, updatePrerDto);
    }

    @Delete(':id')
    async deletePrer(@Param('id') id: string) {
        return await this.PrerService.deletePrer(id);
    }
}