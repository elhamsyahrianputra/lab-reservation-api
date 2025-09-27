import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { LabsModule } from './labs/labs.module';
import { AuthModule } from './auth/auth.module';
import { LabInventoriesModule } from './lab-inventories/lab-inventories.module';
import { ReservationsModule } from './reservations/reservations.module';
import { EquipmentCategoriesModule } from './equipment-categories/equipment-categories.module';
import { EquipmentsModule } from './equipments/equipments.module';
@Module({
    imports: [
        PrismaModule,
        LabsModule,
        AuthModule,
        LabInventoriesModule,
        ReservationsModule,
        EquipmentCategoriesModule,
        EquipmentsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
