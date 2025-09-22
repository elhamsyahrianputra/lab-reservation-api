import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { LabStatus } from '@prisma/client';

export class CreateLabDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
  
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  location: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(LabStatus)
  @IsNotEmpty()
  status: LabStatus;
}
