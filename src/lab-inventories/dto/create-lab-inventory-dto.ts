import { Transform } from 'class-transformer';
import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    Min,
} from 'class-validator';

export class CreateLabInventoryDto {
    @Transform(({ value }) => value.trim())
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    lab_id: string;

    @Transform(({ value }) => value.trim())
    @IsString()
    @IsNotEmpty()
    name: string;

    @Transform(({ value }) => value.trim())
    @IsInt()
    @Min(1)
    quantity: number;

    @Transform(({ value }) => value.trim())
    @IsString()
    @IsOptional()
    description?: string;
}
