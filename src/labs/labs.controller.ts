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
    UseGuards,
} from '@nestjs/common';
import { LabsService } from './labs.service';
import { CreateLabDto } from './dto/create-lab-dto';
import { UpdateLabDto } from './dto/update-lab-dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('labs')
@UseGuards(AuthGuard, RolesGuard)
export class LabsController {
    constructor(private readonly labsService: LabsService) {}

    @Roles('admin')
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createLabDto: CreateLabDto) {
        const lab = await this.labsService.create(createLabDto);
        return {
            message: 'Lab created successfully',
            result: lab,
        };
    }

    @Roles('admin')
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() {
        const labs = await this.labsService.getAll();
        return { message: 'Labs retrieved successfully', result: labs };
    }

    @Roles('admin')
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id', ParseUUIDPipe) id: string) {
        const lab = await this.labsService.getById(id);
        return {
            message: 'Lab retrieved successfully',
            result: lab,
        };
    }

    @Roles('admin')
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateLabDto: UpdateLabDto,
    ) {
        const updatedLab = await this.labsService.update(id, updateLabDto);
        return {
            message: 'Lab updated successfully',
            result: updatedLab,
        };
    }

    @Roles('admin')
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async remove(@Param('id', ParseUUIDPipe) id: string) {
        await this.labsService.delete(id);
        return {
            message: 'Lab deleted successfully',
        };
    }
}
