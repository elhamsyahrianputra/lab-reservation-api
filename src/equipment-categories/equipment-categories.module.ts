import { Module } from '@nestjs/common';
import { EquipmentCategoriesController } from './equipment-categories.controller';
import { EquipmentCategoriesService } from './equipment-categories.service';

@Module({
    controllers: [EquipmentCategoriesController],
    providers: [EquipmentCategoriesService],
})
export class EquipmentCategoriesModule {}
