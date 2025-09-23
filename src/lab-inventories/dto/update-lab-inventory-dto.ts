import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    Min,
} from 'class-validator';

export class UpdateLabInventoryDto {
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    @IsOptional()
    lab_id: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @IsInt()
    @Min(1)
    @IsOptional()
    quantity: number;

    @IsString()
    @IsOptional()
    description?: string;
}
