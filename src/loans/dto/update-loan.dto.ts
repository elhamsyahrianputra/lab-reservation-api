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

export class UpdateLoanDto {
    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    @IsOptional()
    user_id: string;

    @Transform(({ value }) =>
        typeof value === 'string' ? value.trim() : value,
    )
    @IsString()
    @IsOptional()
    notes?: string;

    @IsEnum(LoanStatus)
    @IsNotEmpty()
    @IsOptional()
    status: LoanStatus;

    @Transform(({ value }) => BigInt(new Date(value).getTime()))
    @IsNotEmpty()
    @IsOptional()
    pickup_due_at: bigint;

    @Transform(({ value }) => BigInt(new Date(value).getTime()))
    @IsNotEmpty()
    @IsOptional()
    return_due_at: bigint;

    @Transform(({ value }) => BigInt(new Date(value).getTime()))
    @IsOptional()
    pickup_at?: bigint;

    @Transform(({ value }) => BigInt(new Date(value).getTime()))
    @IsOptional()
    returned_at?: bigint;
}
