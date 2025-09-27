import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { LabsModule } from './labs/labs.module';
import { AuthModule } from './auth/auth.module';
import { LabInventoriesModule } from './lab-inventories/lab-inventories.module';
import { ReservationModule } from './reservations/reservations.module';
import { EquipmentCategoriesModule } from './equipment-categories/equipment-categories.module';
@Module({
    imports: [
        PrismaModule,
        LabsModule,
        AuthModule,
        LabInventoriesModule,
        ReservationModule,
        EquipmentCategoriesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
