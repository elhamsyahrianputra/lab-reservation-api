import { Module } from '@nestjs/common';
import { EquipmentUnitsController } from './equipment-units.controller';
import { EquipmentUnitsService } from './equipment-units.service';
import { EquipmentsModule } from 'src/equipments/equipments.module';

@Module({
    controllers: [EquipmentUnitsController],
    providers: [EquipmentUnitsService],
    imports: [EquipmentsModule],
})
export class EquipmentUnitsModule {}
