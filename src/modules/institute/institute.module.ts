import { Module } from '@nestjs/common';
import { InstituteService } from './servicies/institute.service';
import { InstituteController } from './controllers/institute.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { InstituteRepository } from './repository/institute.repository';
import { InstituteValidator } from './validation/institute.validator';

@Module({
  controllers: [InstituteController],
  providers: [InstituteService, InstituteRepository, InstituteValidator],
  imports: [PrismaModule],
})
export class InstituteModule {}
