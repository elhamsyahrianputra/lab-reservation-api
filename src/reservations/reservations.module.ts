import { Module } from '@nestjs/common';
import { ReservationController } from './reservations.controller';
import { ReservationService } from './reservations.service';

@Module({
    controllers: [ReservationController],
    providers: [ReservationService],
})
export class ReservationModule {}
