import { IsInt, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateLoanItemDto {
    @IsUUID()
    @IsNotEmpty()
    equipment_unit_id: string;

    @IsInt()
    @IsNotEmpty()
    quantity: number;
}
