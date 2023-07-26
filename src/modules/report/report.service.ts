import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReportCompanyDto } from './dto/report-company.dto';
import { ReportCompanyStudentDto } from './dto/report-company-student.dto';

@Injectable()
export class ReportService {

  private logger = new Logger(ReportService.name);
  
  constructor(private _prismaService: PrismaService) { }

  reportByAcademicTutor(academicTutor: string) {
    this.logger.log(`Report by academic tutor ${academicTutor}`);
    
    return `This action returns all report`;
  }

  async reportByCompany(company: string): Promise<ReportCompanyDto> {
    try {
      const companyData = await this._prismaService.company.findFirst({
        where: {
          name: company,
        },
        include: {
          project: {
            where: {
              name: company,
            },
            include: {
              academicTutor: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                },
              },
              businessTutor: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                },
              },
              studentAssignedToCompany: {
                select: {
                  id: true,
                  electivePeriod: true,
                  student: {
                    select: {
                      dni: true,
                      firstName: true,
                      secondName: true,
                      lastName: true,
                      secondLastName: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (!companyData) {
        throw new HttpException('La empresa no existe', HttpStatus.NOT_FOUND);
      }

      // Construimos el DTO ReportCompanyDto con la relación projects
      const reportCompanyDto: ReportCompanyDto = {
        id: companyData.id,
        company: companyData.name,
        academicTutor: {
          id: companyData.project[0]?.academicTutor?.id,
          firstName: companyData.project[0]?.academicTutor?.firstName,
          lastName: companyData.project[0]?.academicTutor?.lastName,
        },
        businessTutor: {
          id: companyData.project[0]?.businessTutor?.id,
          firstName: companyData.project[0]?.businessTutor?.firstName,
          lastName: companyData.project[0]?.businessTutor?.lastName,
        },
        students: companyData.project.map((project) => {
          const studentAssigned = project.studentAssignedToCompany[0];
          const student = studentAssigned?.student;
          const reportCompanyStudentDto: ReportCompanyStudentDto = {
            id: studentAssigned?.id,
            dni: student?.dni,
            firstName: student?.firstName,
            secondName: student?.secondName,
            lastName: student?.lastName,
            secondLastName: student?.secondLastName,
            electivePeriod: studentAssigned?.electivePeriod,
            project: {
              id: project.id,
              name: project.name,
            },
          };
          return reportCompanyStudentDto;
        }),
      };

      return reportCompanyDto;
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
