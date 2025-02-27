import { Module } from '@nestjs/common';
import { TypeCareerService } from './service/type-career.service';
import { TypeCareerController } from './controller/type-career.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TypeCareerRepository } from './repository/type-career.repository';

@Module({
  controllers: [TypeCareerController],
  providers: [TypeCareerService, TypeCareerRepository],
  imports: [PrismaModule],
})
export class TypeCareerModule {}
