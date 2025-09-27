import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLabInventoryDto } from './dto/create-lab-inventory-dto';
import { Prisma } from '@prisma/client';
import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UpdateLabInventoryDto } from './dto/update-lab-inventory-dto';
import { LabsService } from 'src/labs/labs.service';

@Injectable()
export class LabInventoriesService {
    constructor(
        private prisma: PrismaService,
        private readonly labsService: LabsService,
    ) {}

    async create(createLabInventoryDto: CreateLabInventoryDto) {
        const lab = await this.labsService.getById(
            createLabInventoryDto.lab_id,
        );

        try {
            return await this.prisma.labInventory.create({
                data: {
                    ...createLabInventoryDto,
                    created_at: BigInt(Date.now()),
                },
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new ConflictException(
                    `Lab inventory '${createLabInventoryDto.name}' already exist in lab '${lab.name}'.`,
                );
            }
            throw error;
        }
    }

    async getAll() {
        return await this.prisma.labInventory.findMany();
    }

    async getById(id: string) {
        const inventory = await this.prisma.labInventory.findUnique({
            where: { id },
        });

        if (!inventory) {
            throw new NotFoundException(`Lab with ID '${id}' not found`);
        }

        return inventory;
    }

    async update(id: string, updateLabInventoryDto: UpdateLabInventoryDto) {
        try {
            const updatedLab = await this.prisma.labInventory.update({
                where: { id },
                data: {
                    ...updateLabInventoryDto,
                    updated_at: BigInt(Date.now()),
                },
            });
            return updatedLab;
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new ConflictException(
                    `Lab inventory with name '${updateLabInventoryDto.name}`,
                );
            }
            throw error;
        }
    }

    async delete(id: string) {
        await this.getById(id);

        await this.prisma.labInventory.delete({
            where: {
                id: id,
            },
        });
    }
}
