import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLabDto } from './dto/create-lab-dto';
import id from 'zod/v4/locales/id.js';
import { Prisma } from '@prisma/client';
import { UpdateLabDto } from './dto/update-lab-dto';

@Injectable()
export class LabsService {
  constructor(private prisma: PrismaService) {}

  async create(createLabDto: CreateLabDto) {
    try {
      const dataToCreate = {
        ...createLabDto,
        created_at: BigInt(Date.now()),
      };

      return await this.prisma.lab.create({
        data: dataToCreate,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          `Lab with name '${createLabDto.name}' already exists.`,
        );
      }
      throw error;
    }
  }

  getAll() {
    return this.prisma.lab.findMany();
  }

  async getById(id: string) {
    const lab = await this.prisma.lab.findUnique({
      where: {
        id: id,
      },
    });

    if (!lab) {
      throw new NotFoundException(`Lab with ID '${id}' not found`);
    }

    return lab;
  }

  async update(id: string, updateLabDto: UpdateLabDto) {
    await this.getById(id);

    try {
      const updatedLab = await this.prisma.lab.update({
        where: {
          id: id,
        },
        data: {
          ...updateLabDto,
          updated_at: BigInt(Date.now()),
        },
      });
      return updatedLab;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(`Lab with name '${updateLabDto.name}`);
      }
      throw error;
    }
  }

  async delete(id: string) {
    await this.getById(id);

    await this.prisma.lab.delete({
      where: {
        id,
      },
    });
  }
}
