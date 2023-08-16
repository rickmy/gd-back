import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ReportCompanyDto } from './dto/report-company.dto';
import { ReportByTutorDto } from './dto/report-by-tutor.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth/auth.guard';

@ApiTags('Report')
@Controller('report')
@UseGuards(JwtAuthGuard)
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @ApiOkResponse({
    description: 'Reporte por tutor académico',
    type: ReportByTutorDto,
  })
  @Get('byAcademicTutor')
  reportByAcademicTutor(
    @Query('academicTutor') academicTutor: string,
  ){
    return this.reportService.reportByAcademicTutor(academicTutor);
  }

  @ApiOkResponse({
    description: 'Reporte por nombre de empresa',
    type: ReportCompanyDto,
  })
  @Get('byCompanyName')
   reportByCompany(@Query('companyName') company: string){
    return this.reportService.reportByCompany(company);
  }
}
