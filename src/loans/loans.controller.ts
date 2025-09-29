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
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';

@Controller('loans')
export class LoansController {
    constructor(private readonly loansService: LoansService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createLoanDto: CreateLoanDto) {
        const loan = await this.loansService.create(createLoanDto);

        return {
            message: 'Loan created successfully',
            result: loan,
        };
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() {
        const loans = await this.loansService.getAll();

        return {
            message: 'Loans retrieved successfully',
            result: loans,
        };
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string) {
        const loan = await this.loansService.getById(id);

        return {
            message: 'Loan retrieved successfully',
            result: loan,
        };
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id') id: string,
        @Body() updateLoanDto: UpdateLoanDto,
    ) {
        const loan = await this.loansService.update(id, updateLoanDto);

        return {
            message: 'Loan updated successfully',
            result: loan,
        };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: string) {
        await this.loansService.delete(id);

        return {
            message: 'Loan deleted successfully',
        };
    }
}
