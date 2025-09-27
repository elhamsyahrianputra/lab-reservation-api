import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation-dto';
import { UpdateReservationDto } from './dto/update-reservation-dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('reservations')
@UseGuards(AuthGuard, RolesGuard)
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}

    @Roles('admin', 'member')
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createReservationDto: CreateReservationDto) {
        const reservation =
            await this.reservationService.create(createReservationDto);

        return {
            message: 'Reservation created successfully',
            result: reservation,
        };
    }

    @Roles('admin')
    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll() {
        const reservations = await this.reservationService.getAll();

        return {
            message: 'Reservations retrieved successfully',
            result: reservations,
        };
    }

    @Roles('admin')
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findOne(@Param('id') id: string) {
        const reservation = await this.reservationService.getById(id);

        return {
            message: 'Reservation retrieved successfully',
            result: reservation,
        };
    }

    @Roles('admin')
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    async update(
        @Param('id') id: string,
        @Body() updateReservationDto: UpdateReservationDto,
    ) {
        const reservation = await this.reservationService.update(
            id,
            updateReservationDto,
        );

        return {
            message: 'Update reservation successfully',
            result: reservation,
        };
    }

    @Roles('admin')
    @Patch(':id/approve')
    @HttpCode(HttpStatus.OK)
    async approved(@Param('id') id: string) {
        const reservation = await this.reservationService.approve(id);

        return {
            message: ' Reservation approved successfully',
            result: reservation,
        };
    }

    @Roles('member')
    @Patch(':id/cancel')
    @HttpCode(HttpStatus.OK)
    async cancelled(@Param('id') id: string) {
        const reservation = await this.reservationService.cancel(id);

        return {
            message: 'Reservation cancelled successfully',
            result: reservation,
        };
    }

    @Roles('admin')
    @Patch(':id/check-in')
    @HttpCode(HttpStatus.OK)
    async checkIn(@Param('id') id: string) {
        const reservation = await this.reservationService.checkIn(id);

        return {
            message: 'Reservation checked in successfully',
            result: reservation,
        };
    }

    @Roles('admin')
    @Patch(':id/check-out')
    @HttpCode(HttpStatus.OK)
    async completed(@Param('id') id: string) {
        const reservation = await this.reservationService.checkOut(id);

        return {
            message: ' Reservation checked out successfully',
            result: reservation,
        };
    }

    @Roles('admin')
    @Patch(':id/reject')
    @HttpCode(HttpStatus.OK)
    async rejected(@Param('id') id: string) {
        const reservation = await this.reservationService.reject(id);

        return {
            message: ' Reservation rejected successfully',
            result: reservation,
        };
    }

    @Roles('admin')
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    async delete(@Param('id') id: string) {
        await this.reservationService.delete(id);

        return {
            message: ' Reservation deleted successfully',
        };
    }
}
