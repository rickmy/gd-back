import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReportCompanyDto } from './dto/report-company.dto';
import { Prisma } from '@prisma/client';
import { ReportByTutorDto } from './dto/report-by-tutor.dto';
import { StudentProjectDto } from '../students/dto/student-project.dto';
import { TutorDto } from '../tutor/dto/tutor.dto';
import { first } from 'rxjs';

@Injectable()
export class ReportService {

  private logger = new Logger(ReportService.name);

  constructor(private _prismaService: PrismaService) { }

  async reportByAcademicTutor(academicTutor: string): Promise<ReportByTutorDto[]> {
    this.logger.log(`Report by academic tutor ${academicTutor}`);

    try {
      const registration = await this._prismaService.studentAssignedToCompany.findMany({
        where: {
          project: {
            academicTutor: {
              OR: [
                {
                  firstName: {
                    contains: academicTutor,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
                {
                  lastName: {
                    contains: academicTutor,
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
              ],
            },
            state: true,
          }
        },
        include: {
          student: true,
          company: true,
          project: {
            include: {
              academicTutor: true,
              businessTutor: true,
            }
          },
        },
      });

      if (!registration || registration.length === 0) {
        throw new HttpException('No se encontraron registros para este tutor', HttpStatus.NOT_FOUND);
      }

      const studentByCompany = registration.map((registration) => {
        const student = {
          completeNames: `${registration.student.firstName} ${registration.student.secondName} ${registration.student.lastName} ${registration.student.secondLastName}`,
          periodElective: registration.electivePeriod,
          periodAcademic: registration.academicPeriod,
          project: registration.project.name,
        };
        return {
          company: registration.company.name,
          academicTutor: registration.project.academicTutor.firstName,
          businessTutor: registration.project.businessTutor.firstName,
          student,
        };
      });

      if (!studentByCompany || studentByCompany.length === 0) {
        throw new HttpException('No se encontraron registros para este tutor', HttpStatus.NOT_FOUND);
      }
  
      const reportByTutor = studentByCompany.reduce((acc, curr) => {
        const found = acc.find((item) => item.company === curr.company);
        if (found) {
          found.student.push(curr.student);
        } else {
          acc.push({
            company: curr.company,
            academicTutor: curr.academicTutor,
            businessTutor: curr.businessTutor,
            student: [curr.student],
          });
        }
        return acc;
      }, []);

      if (!reportByTutor || reportByTutor.length === 0) {
        throw new HttpException('No se encontraron registros para este tutor', HttpStatus.NOT_FOUND);
      }
  
      return reportByTutor;
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new HttpException(error.message, error.status);
    }

  }

  async reportByCompany(company: string): Promise<ReportCompanyDto> {
    try {

      const companyName = await this._prismaService.company.findFirst({
        where: {
          name: {
            contains: company,
            mode: Prisma.QueryMode.insensitive,
          },
          state: true,
        },
      });

      if (!companyName) {
        throw new HttpException('La empresa no existe', HttpStatus.NOT_FOUND);
      }

      const registration = await this._prismaService.studentAssignedToCompany.findMany({
        where: {
          idCompany: companyName.id,
        },
        include: {
          student: true,
          company: true,
          project: {
            include: {
              academicTutor: true,
              businessTutor: true,
            },
          },
        },
      });

      if (!registration) {
        throw new HttpException('No existen proyectos y/o estudiantes asignados a esta empresa', HttpStatus.NOT_FOUND);
      }

  
      const students: StudentProjectDto[] = registration.map(registration => ({
        completeNames: `${registration.student.firstName} ${registration.student.secondName ?? ''} ${registration.student.lastName} ${registration.student.secondLastName ?? ''}`,
        periodElective: registration.electivePeriod,
        periodAcademic: registration.academicPeriod,
        project: registration.project?.name ?? null,
      }));
  
      const academicTutor: string = `${registration[0].project?.academicTutor?.firstName ?? null} ${registration[0].project?.academicTutor?.lastName ?? null}`;
      const businessTutor: string = `${registration[0].project?.businessTutor?.firstName ?? null} ${registration[0].project?.businessTutor?.lastName ?? null}`;
  
      const reportCompanyDto: ReportCompanyDto = {
        company: registration[0].company.name,
        academicTutor,
        businessTutor,
        students,
      };
      
      return reportCompanyDto;
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
