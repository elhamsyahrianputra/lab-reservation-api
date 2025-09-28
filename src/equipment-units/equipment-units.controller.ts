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
import { EquipmentUnitsService } from './equipment-units.service';
import { CreateEquipmentUnitDto } from './dto/create-equipment-unit-dto';
import { UpdateEquipmentUnitDto } from './dto/update-equipment-unit-dto';

@Controller('equipment-units')
export class EquipmentUnitsController {
    constructor(
        private readonly equipmentUnitsService: EquipmentUnitsService,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createEquipmentUnitDto: CreateEquipmentUnitDto) {
        const equipmentUnit = await this.equipmentUnitsService.create(
            createEquipmentUnitDto,
        );

        return {
            message: 'Equipment unit created sucessfully',
            result: equipmentUnit,
        };
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() {
        const equipmentUnits = await this.equipmentUnitsService.getAll();

        return {
            message: 'Equipment units retrieved successfully',
            result: equipmentUnits,
        };
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string) {
        const equipmentUnit = await this.equipmentUnitsService.getById(id);

        return {
            message: 'Equipment unit retrieved successfully',
            result: equipmentUnit,
        };
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id') id: string,
        @Body() updateEquipmentUnitDto: UpdateEquipmentUnitDto,
    ) {
        const equipmentUnit = await this.equipmentUnitsService.update(
            id,
            updateEquipmentUnitDto,
        );

        return {
            message: 'Equipment unit updated successfully',
            result: equipmentUnit,
        };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: string) {
        await this.equipmentUnitsService.delete(id);

        return {
            message: 'Equipment unit deleted successfully',
        };
    }
}
