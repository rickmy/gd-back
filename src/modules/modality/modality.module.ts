import { Module } from '@nestjs/common';
import { ModalityService } from './servicie/modality.service';
import { ModalityRepository } from './repository/modality.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ModalityController } from './controller/modality.controller';

@Module({
  controllers: [ModalityController],
  providers: [ModalityService, ModalityRepository],
  imports: [PrismaModule],
})
export class ModalityModule {}
