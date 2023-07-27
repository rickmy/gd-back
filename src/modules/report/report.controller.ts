import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReportCompanyDto } from './dto/report-company.dto';

@ApiTags('Report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('byAcademicTutor')
  reportByAcademicTutor(
    @Query('academicTutor') academicTutor: string,
  ){
    return this.reportService.reportByAcademicTutor(academicTutor);
  }

  @ApiOkResponse({
    description: 'Información del proyecto encontrada',
    type: ReportCompanyDto,
  })
  @Get('byCompanyName')
   reportByCompany(@Query('companyName') company: string){
    return this.reportService.reportByCompany(company);
  }
}
