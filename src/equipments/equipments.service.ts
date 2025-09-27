import { PrismaClient } from '@prisma/client/extension';
import { CreateEquipmentDto } from './dto/create-equipment-dto';
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateEquipmentDto } from './dto/update-equipment-dto';

@Injectable()
export class EquipmentsService {
    constructor(private prisma: PrismaService) {}

    async create(createEquipmentDto: CreateEquipmentDto) {
        try {
            return await this.prisma.equipment.create({
                data: {
                    ...createEquipmentDto,
                    created_at: BigInt(Date.now()),
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        return await this.prisma.equipment.findMany();
    }

    async getById(id: string) {
        const equipment = await this.prisma.equipment.findUnique({
            where: { id },
        });

        if (!equipment) {
            throw new NotFoundException(`Equipment with ID '${id}' not found`);
        }

        return equipment;
    }

    async update(id: string, updateEquipmentDto: UpdateEquipmentDto) {
        await this.getById(id);

        try {
            return await this.prisma.equipment.update({
                where: { id },
                data: {
                    ...updateEquipmentDto,
                    updated_at: BigInt(Date.now()),
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async delete(id: string) {
        await this.getById(id);

        await this.prisma.equipment.delete({
            where: { id },
        });
    }
}
