import { Module } from '@nestjs/common';
import { LabInventoriesController } from './lab-inventories.controller';
import { LabInventoriesService } from './lab-inventories.service';
import { LabsModule } from 'src/labs/labs.module';

@Module({
    imports: [LabsModule],
    controllers: [LabInventoriesController],
    providers: [LabInventoriesService],
})
export class LabInventoriesModule {}
