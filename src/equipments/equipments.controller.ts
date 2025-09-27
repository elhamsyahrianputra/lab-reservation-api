import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { EquipmentsService } from './equipments.service';
import { CreateEquipmentDto } from './dto/create-equipment-dto';
import { UpdateEquipmentDto } from './dto/update-equipment-dto';

@Controller('equipments')
export class EquipmentsController {
    constructor(private readonly equipmentsService: EquipmentsService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createEquipmentDto: CreateEquipmentDto) {
        const equipment =
            await this.equipmentsService.create(createEquipmentDto);

        return {
            message: 'Equipment created successfully',
            result: equipment,
        };
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() {
        const equipments = await this.equipmentsService.getAll();

        return {
            meassge: 'Equipments retrieved successfully',
            result: equipments,
        };
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string) {
        const equipment = await this.equipmentsService.getById(id);

        return {
            message: 'Equipment retrieved successfully',
            result: equipment,
        };
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id') id: string,
        @Body() updateEquipmentDto: UpdateEquipmentDto,
    ) {
        const equipment = await this.equipmentsService.update(
            id,
            updateEquipmentDto,
        );

        return {
            message: 'Equipment updated successfully',
            result: equipment,
        };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: string) {
        await this.equipmentsService.delete(id);

        return {
            message: 'Equipment deleted successfully',
        };
    }
}
