import {
    Injectable,
    UnauthorizedException,
    ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async register(registerDto: RegisterDto) {
        try {
            const roleMember = await this.prisma.role.findUnique({
                where: {
                    name: 'member',
                },
            });

            const user = await this.prisma.user.create({
                data: {
                    ...registerDto,
                    password: await bcrypt.hash(registerDto.password, 10),
                    created_at: BigInt(Date.now()),
                    roles: {
                        create: [
                            {
                                role_id: roleMember!.id,
                                created_at: BigInt(Date.now()),
                            },
                        ],
                    },
                },
            });

            return {
                id: user.id,
                name: user.name,
                email: user.email,
            };
        } catch (error) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new ConflictException(`Email already exists.`);
            }
            throw error;
        }
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('Email or password is incorrect');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Email or password is incorrect');
        }

        const authToken = uuid();
        const authTokenExpiresAt = new Date(Date.now() + 3600 * 1000); // Token berlaku selama 1 jam

        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                auth_token: authToken,
                auth_token_expires_at: BigInt(authTokenExpiresAt.getTime()),
            },
        });

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            auth_token: authToken,
        };
    }
}
