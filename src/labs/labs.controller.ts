import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { LabsService } from './labs.service';
import { CreateLabDto } from './dto/create-lab-dto';
import { UpdateLabDto } from './dto/update-lab-dto';

@Controller('labs')
export class LabsController {
  constructor(private readonly labsService: LabsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createLabDto: CreateLabDto) {
    const lab = await this.labsService.create(createLabDto);
    return {
      message: 'Lab created successfully',
      result: lab,
    };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const labs = await this.labsService.getAll();
    return { message: 'Labs retrieved successfully', result: labs };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const lab = await this.labsService.getById(id);
    return {
      message: 'Lab retrieved successfully',
      result: lab,
    };
  }

  @Patch(':id')
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

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.labsService.delete(id);
    return {
      message: 'Lab deleted successfully',
    };
  }
}
