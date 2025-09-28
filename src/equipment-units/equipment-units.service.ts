import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEquipmentUnitDto } from './dto/create-equipment-unit-dto';
import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UpdateEquipmentUnitDto } from './dto/update-equipment-unit-dto';
import { Prisma } from '@prisma/client';
import { EquipmentsService } from 'src/equipments/equipments.service';

@Injectable()
export class EquipmentUnitsService {
    constructor(
        private prisma: PrismaService,
        private equipmentsService: EquipmentsService,
    ) {}

    async create(createEquipmentUnitDto: CreateEquipmentUnitDto) {
        await this.equipmentsService.getById(
            createEquipmentUnitDto.equipment_id,
        );

        try {
            return await this.prisma.equipmentUnit.create({
                data: {
                    ...createEquipmentUnitDto,
                    purchased_at:
                        typeof createEquipmentUnitDto.puchased_at !==
                        'undefined'
                            ? new Date(
                                  createEquipmentUnitDto.puchased_at as string,
                              ).getTime()
                            : undefined,
                    created_at: BigInt(Date.now()),
                },
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new ConflictException(
                    `Equipment unit with code '${createEquipmentUnitDto.code}' already exists`,
                );
            }
        }
    }

    async getAll() {
        return await this.prisma.equipmentUnit.findMany();
    }

    async getById(id: string) {
        const equipmentUnit = await this.prisma.equipmentUnit.findUnique({
            where: { id },
        });

        if (!equipmentUnit) {
            throw new NotFoundException(
                `Equipment unit with ID '${id}' not found`,
            );
        }

        return equipmentUnit;
    }

    async update(id: string, updateEquipmentUnitDto: UpdateEquipmentUnitDto) {
        await this.getById(id);

        try {
            return await this.prisma.equipmentUnit.update({
                where: { id },
                data: {
                    ...updateEquipmentUnitDto,
                    updated_at: BigInt(Date.now()),
                },
            });
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new ConflictException(
                    `Equipment unit with code '${updateEquipmentUnitDto.code}' already exists`,
                );
            }
        }
    }

    async delete(id: string) {
        await this.getById(id);

        await this.prisma.equipmentUnit.delete({
            where: { id },
        });
    }
}
