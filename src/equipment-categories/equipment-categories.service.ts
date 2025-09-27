import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEquipmentCategoryDto } from './dto/create-equipment-category.dto';
import { Prisma } from '@prisma/client';
import {
    ConflictException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UpdateEquipmentCategoryDto } from './dto/update-equipment-category.dto';

@Injectable()
export class EquipmentCategoriesService {
    constructor(private prisma: PrismaService) {}

    async create(createEquipmentCategoryDto: CreateEquipmentCategoryDto) {
        try {
            return await this.prisma.equipmentCategory.create({
                data: {
                    ...createEquipmentCategoryDto,
                    created_at: BigInt(Date.now()),
                },
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new ConflictException(
                    `Equipment category with name '${createEquipmentCategoryDto.name}' already exists.`,
                );
            }
            throw error;
        }
    }

    async getAll() {
        return this.prisma.equipmentCategory.findMany();
    }

    async getById(id: string) {
        const equipmentCategory =
            await this.prisma.equipmentCategory.findUnique({
                where: { id },
            });

        if (!equipmentCategory) {
            throw new NotFoundException(
                `Equipment category with ID '${id}' not found`,
            );
        }

        return equipmentCategory;
    }

    async update(
        id: string,
        updateEquipmentCategoryDto: UpdateEquipmentCategoryDto,
    ) {
        await this.getById(id);

        try {
            return await this.prisma.equipmentCategory.update({
                where: { id },
                data: {
                    ...updateEquipmentCategoryDto,
                    updated_at: BigInt(Date.now()),
                },
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new ConflictException(
                    `Equipment category with name '${updateEquipmentCategoryDto.name}' already exists.`,
                );
            }
            throw error;
        }
    }

    async delete(id: string) {
        await this.getById(id);

        await this.prisma.equipmentCategory.delete({
            where: { id },
        });
    }
}
