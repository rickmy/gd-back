import { Injectable, Logger } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReportService {

  private logger = new Logger(ReportService.name);
  
  constructor(private _prismaService: PrismaService) { }

  reportByAcademicTutor(academicTutor: string) {
    this.logger.log(`Report by academic tutor ${academicTutor}`);
    
    return `This action returns all report`;
  }
}
