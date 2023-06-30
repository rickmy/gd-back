import { Module } from '@nestjs/common';
import { AgreementService } from './agreement.service';
import { AgreementController } from './agreement.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [AgreementController],
  providers: [AgreementService],
  imports: [PrismaModule]
})
export class AgreementModule {}
