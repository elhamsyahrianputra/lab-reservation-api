import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { LabsModule } from './labs/labs.module';
import { AuthModule } from './auth/auth.module';
import { LabInventoriesModule } from './lab-inventories/lab-inventories.module';
import { ReservationsModule } from './reservations/reservations.module';
import { EquipmentCategoriesModule } from './equipment-categories/equipment-categories.module';
import { EquipmentsModule } from './equipments/equipments.module';
import { EquipmentUnitsModule } from './equipment-units/equipment-units.module';
@Module({
    imports: [
        PrismaModule,
        LabsModule,
        AuthModule,
        LabInventoriesModule,
        ReservationsModule,
        EquipmentCategoriesModule,
        EquipmentsModule,
        EquipmentUnitsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
