import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
} from '@nestjs/common';
import { LabInventoriesService } from './lab-inventories.service';
import { CreateLabInventoryDto } from './dto/create-lab-inventory-dto';
import { UpdateLabInventoryDto } from './dto/update-lab-inventory-dto';

@Controller('lab-inventories')
export class LabInventoriesController {
    constructor(
        private readonly labInventoriesService: LabInventoriesService,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createLabInventoryDto: CreateLabInventoryDto) {
        const inventory = await this.labInventoriesService.create(
            createLabInventoryDto,
        );

        return {
            message: 'Lab inventory created successfully',
            result: inventory,
        };
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() {
        const inventories = await this.labInventoriesService.getAll();

        return {
            message: 'Lab inventories retrieved successfully',
            result: inventories,
        };
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        const inventory = await this.labInventoriesService.getById(id);

        return {
            message: 'Lab inventory retrieved successfully',
            result: inventory,
        };
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateLabInventoryDto: UpdateLabInventoryDto,
    ) {
        const inventory = await this.labInventoriesService.update(
            id,
            updateLabInventoryDto,
        );

        return {
            message: 'Lab inventory updated successfully',
            result: inventory,
        };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        await this.labInventoriesService.delete(id);
        
        return {
            message: 'Lab inventory deleted successfully',
        };
    }
}
