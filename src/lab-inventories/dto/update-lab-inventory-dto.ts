import { Transform } from 'class-transformer';
import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    Min,
} from 'class-validator';

export class UpdateLabInventoryDto {
    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    @IsOptional()
    lab_id: string;

    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsInt()
    @Min(1)
    @IsOptional()
    quantity: number;

    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsString()
    @IsOptional()
    description?: string;
}
