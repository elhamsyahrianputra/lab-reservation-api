import { ReservationStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
    IsDateString,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';

export class CreateReservationDto {
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    user_id: string;

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    lab_id: string;

    @IsEnum(ReservationStatus)
    status: ReservationStatus;

    @Transform(({ value }) => value.trim())
    @IsString()
    @IsOptional()
    notes?: string;

    @IsInt()
    @IsNotEmpty()
    duration: number;

    @IsDateString()
    @IsNotEmpty()
    booking_at: string;
}
