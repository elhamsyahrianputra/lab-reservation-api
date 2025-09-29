import { LoanStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';

export class CreateLoanDto {
    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsNotEmpty()
    @IsUUID()
    user_id: string;

    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsString()
    @IsOptional()
    notes?: string;

    @IsEnum(LoanStatus)
    @IsNotEmpty()
    status: LoanStatus;

    @Transform(({ value }) => BigInt(new Date(value).getTime()))
    @IsNotEmpty()
    pickup_due_at: bigint;

    @Transform(({ value }) => BigInt(new Date(value).getTime()))
    @IsNotEmpty()
    return_due_at: bigint;

    @Transform(({ value }) => BigInt(new Date(value).getTime()))
    @IsDateString()
    @IsOptional()
    pickup_at?: bigint;

    @Transform(({ value }) => BigInt(new Date(value).getTime()))
    @IsDateString()
    @IsOptional()
    returned_at?: bigint;
}
