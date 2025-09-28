import { EquipmentUnitCondition, EquipmentUnitStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';

export class CreateEquipmentUnitDto {
    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    equipment_id: string;

    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsString()
    @IsNotEmpty()
    code: string;

    @IsEnum(EquipmentUnitCondition)
    @IsNotEmpty()
    condition: EquipmentUnitCondition;

    @IsEnum(EquipmentUnitStatus)
    @IsNotEmpty()
    status: EquipmentUnitStatus;

    @IsString()
    @IsOptional()
    description?: string;

    @IsDateString()
    @IsOptional()
    puchased_at?: string;
}
