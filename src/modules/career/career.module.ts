import { Module } from '@nestjs/common';
import { CareerService } from './career.service';
import { CareerController } from './career.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CareerController],
  providers: [CareerService],
  imports: [PrismaModule],
})
export class CareerModule {}
