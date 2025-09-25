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
    @Transform(({ value }) => value.trim())
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    @IsOptional()
    lab_id: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @Transform(({ value }) => value.trim())
    @IsInt()
    @Min(1)
    @IsOptional()
    quantity: number;

    @Transform(({ value }) => value.trim())
    @IsString()
    @IsOptional()
    description?: string;
}
