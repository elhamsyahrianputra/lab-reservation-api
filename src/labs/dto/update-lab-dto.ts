import { LabStatus } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateLabDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(255)
  name?: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsOptional()
  @MaxLength(255)
  location?: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(LabStatus)
  @IsOptional()
  status?: LabStatus;
}
