import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ApiTags } from '@nestjs/swagger';
import { ReportCompanyDto } from './dto/report-company.dto';

@ApiTags('Report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  reportByAcademicTutor(
    @Query('academicTutor') academicTutor: string,
  ){
    return this.reportService.reportByAcademicTutor(academicTutor);
  }

  @Get(':companyName')
  async reportByCompany(@Param('companyName') company: string): Promise<ReportCompanyDto>{
    return this.reportService.reportByCompany(company);
  }
}
