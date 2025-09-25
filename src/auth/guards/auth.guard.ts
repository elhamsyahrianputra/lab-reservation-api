import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private prisma: PrismaService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Authentication token not found');
        }

        try {
            const user = await this.prisma.user.findFirst({
                where: {
                    auth_token: token,
                    auth_token_expires_at: {
                        gt: BigInt(Date.now()), // Pastikan token belum kedaluwarsa
                    },
                },
                include: {
                    roles: {
                        include: {
                            role: true,
                        },
                    },
                },
            });

            if (!user) {
                throw new UnauthorizedException('Invalid or expired token');
            }
            // Menempelkan data user ke request agar bisa diakses di handler selanjutnya (termasuk RolesGuard)
            request['user'] = user;
        } catch (error) {
            // Bisa jadi UnauthorizedException dari blok try, atau error lainnya
            throw new UnauthorizedException(
                error.message || 'Authentication failed',
            );
        }
        return true;
    }

    private extractTokenFromHeader(request: any): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
