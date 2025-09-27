import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation-dto';
import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Prisma, ReservationStatus } from '@prisma/client';
import { UpdateLabDto } from 'src/labs/dto/update-lab-dto';
import { UpdateReservationDto } from './dto/update-reservation-dto';

@Injectable()
export class ReservationService {
    constructor(private prisma: PrismaService) {}

    async create(createReservationDto: CreateReservationDto) {
        return await this.prisma.reservation.create({
            data: {
                ...createReservationDto,
                booking_at: new Date(createReservationDto.booking_at).getTime(),
                created_at: BigInt(Date.now()),
            },
        });
    }

    async getAll() {
        return await this.prisma.reservation.findMany();
    }

    async getById(id: string) {
        const reservation = await this.prisma.reservation.findUnique({
            where: { id },
        });

        if (!reservation) {
            throw new NotFoundException(
                `Reservation with ID '${id}' not found`,
            );
        }

        return reservation;
    }

    async update(id: string, updateReservationDto: UpdateReservationDto) {
        await this.getById(id);

        return await this.prisma.reservation.update({
            where: { id },
            data: {
                ...updateReservationDto,
                updated_at: BigInt(Date.now()),
            },
        });
    }

    async approve(id: string) {
        await this.getById(id);

        return await this.prisma.reservation.update({
            where: { id },
            data: {
                status: ReservationStatus.APPROVED,
            },
        });
    }

    async cancel(id: string) {
        await this.getById(id);

        return await this.prisma.reservation.update({
            where: { id },
            data: {
                status: ReservationStatus.CANCELLED,
            },
        });
    }

    async checkIn(id: string) {
        await this.getById(id);

        return await this.prisma.reservation.update({
            where: { id },
            data: {
                status: ReservationStatus.IN_PROGRESS,
            },
        });
    }

    async checkOut(id: string) {
        await this.getById(id);

        return await this.prisma.reservation.update({
            where: { id },
            data: {
                status: ReservationStatus.COMPLETED,
            },
        });
    }

    async reject(id: string) {
        await this.getById(id);

        return await this.prisma.reservation.update({
            where: { id },
            data: {
                status: ReservationStatus.REJECTED,
            },
        });
    }

    async delete(id: string) {
        await this.getById(id);
        return await this.prisma.reservation.delete({
            where: { id },
        });
    }
}
