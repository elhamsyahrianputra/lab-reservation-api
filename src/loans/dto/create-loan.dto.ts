import { LoanStatus } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
    IsArray,
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    ValidateNested,
} from 'class-validator';
import { CreateLoanItemDto } from './create-loan-item.dto';

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

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateLoanItemDto)
    items: CreateLoanItemDto[];
}
