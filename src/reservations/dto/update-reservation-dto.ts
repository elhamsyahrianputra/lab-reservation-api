import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateReservationDto {
    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsString()
    @IsOptional()
    notes?: string;

    @ValidateIf((object, value) => value !== null)
    @IsInt()
    @IsNotEmpty()
    @IsOptional()
    duration?: number;
}
