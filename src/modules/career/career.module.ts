import { Module } from '@nestjs/common';
import { CareerService } from './service/career.service';
import { CareerController } from './controller/career.controller';
import { CareerRepository } from './repository/career.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CareerController],
  providers: [CareerService, CareerRepository],
  imports: [PrismaModule],
})
export class CareerModule {}
