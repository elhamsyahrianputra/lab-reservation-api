import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { LabsModule } from './labs/labs.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [PrismaModule, LabsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
