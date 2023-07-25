import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ReportByTutorDto } from './dto/report-by-tutor.dto';

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
}
