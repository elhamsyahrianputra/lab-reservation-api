import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { LabStatus } from '@prisma/client';
import { Transform } from 'class-transformer';

export class CreateLabDto {
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  location: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(LabStatus)
  @IsNotEmpty()
  status: LabStatus;
}
