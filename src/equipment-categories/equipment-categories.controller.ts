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
import { CreateEquipmentCategoryDto } from './dto/create-equipment-category.dto';
import { EquipmentCategoriesService } from './equipment-categories.service';

@Controller('equipment-categories')
export class EquipmentCategoriesController {
    constructor(
        private readonly equipmentCategoriesService: EquipmentCategoriesService,
    ) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    async create(
        @Body() createEquipmentCategoryDto: CreateEquipmentCategoryDto,
    ) {
        const equipmentCategory = await this.equipmentCategoriesService.create(
            createEquipmentCategoryDto,
        );

        return {
            message: 'Equipment category created successfully',
            result: equipmentCategory,
        };
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    async findAll() {
        const equipmentCategories =
            await this.equipmentCategoriesService.getAll();

        return {
            message: 'Equipment categories retrieved successfully',
            result: equipmentCategories,
        };
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        const equipmentCategory =
            await this.equipmentCategoriesService.getById(id);

        return {
            message: 'Equipment category retrieved successfully',
            result: equipmentCategory,
        };
    }

    @HttpCode(HttpStatus.OK)
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateEquipmentCategoryDto: CreateEquipmentCategoryDto,
    ) {
        const equipmentCategory = await this.equipmentCategoriesService.update(
            id,
            updateEquipmentCategoryDto,
        );
        return {
            message: 'Equipment category updated successfully',
            result: equipmentCategory,
        };
    }

    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.equipmentCategoriesService.delete(id);
        return {
            message: 'Equipment category deleted successfully',
        };
    }
}
