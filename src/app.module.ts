import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { LabsModule } from './labs/labs.module';
import { AuthModule } from './auth/auth.module';
import { LabInventoriesModule } from './lab-inventories/lab-inventories.module';
@Module({
    imports: [PrismaModule, LabsModule, AuthModule, LabInventoriesModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
