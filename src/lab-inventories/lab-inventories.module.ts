import { Module } from '@nestjs/common';
import { LabInventoriesController } from './lab-inventories.controller';
import { LabInventoriesService } from './lab-inventories.service';

@Module({
    controllers: [LabInventoriesController],
    providers: [LabInventoriesService],
})
export class LabInventoriesModule {}
