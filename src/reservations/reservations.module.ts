import { Module } from '@nestjs/common';
import { ReservationController } from './reservations.controller';
import { ReservationService } from './reservations.service';
import { LabsModule } from 'src/labs/labs.module';

@Module({
    controllers: [ReservationController],
    providers: [ReservationService],
    imports: [LabsModule],
})
export class ReservationsModule {}
