import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateLoanDto } from './dto/update-loan.dto';

@Injectable()
export class LoansService {
    constructor(private prisma: PrismaService) {}

    async create(createLoanDto: CreateLoanDto) {
        const { items, ...loanData } = createLoanDto;

        return await this.prisma.loan.create({
            data: {
                ...loanData,
                created_at: BigInt(Date.now()),
                items: {
                    create: items.map((item) => ({
                        equipment_unit: {
                            connect: {
                                id: item.equipment_unit_id,
                            },
                        },
                        created_at: BigInt(Date.now()),
                    })),
                },
            },
            include: {
                items: {
                    include: {
                        equipment_unit: true,
                    },
                },
            },
        });
    }

    async getAll() {
        return await this.prisma.loan.findMany();
    }

    async getById(id: string) {
        const loan = await this.prisma.loan.findUnique({
            where: { id },
        });

        if (!loan) {
            throw new NotFoundException(`Loan with ID '${id} not found`);
        }

        return loan;
    }

    async update(id: string, updateLoanDto: UpdateLoanDto) {
        await this.getById(id);

        return await this.prisma.loan.update({
            where: { id },
            data: {
                ...updateLoanDto,
                updated_at: BigInt(Date.now()),
            },
        });
    }

    async delete(id: string) {
        await this.getById(id);

        await this.prisma.loan.delete({
            where: { id },
        });
    }
}
