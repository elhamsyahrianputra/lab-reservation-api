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

export class UpdateEquipmentUnitDto {
    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    @IsOptional()
    equipment_id: string;

    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    code: string;

    @IsEnum(EquipmentUnitCondition)
    @IsNotEmpty()
    @IsOptional()
    condition: EquipmentUnitCondition;

    @IsEnum(EquipmentUnitStatus)
    @IsNotEmpty()
    @IsOptional()
    status: EquipmentUnitStatus;

    @IsString()
    @IsOptional()
    description?: string;

    @IsDateString()
    @IsOptional()
    puchased_at?: string;
}
