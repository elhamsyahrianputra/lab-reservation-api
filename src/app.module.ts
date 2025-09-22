import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { LabsModule } from './labs/labs.module';
@Module({
  imports: [PrismaModule, LabsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
