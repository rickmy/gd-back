import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAgreementDto } from './dto/create-agreement.dto';
import { UpdateAgreementDto } from './dto/update-agreement.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AgreementEntity } from './entities/agreement.entity';
import { MailService } from '../mail/mail.service';
const cron = require('node-cron');
import { AgreementDto } from './dto/agreement.dto';

@Injectable()
export class AgreementService {

  constructor(
    private _prismaService: PrismaService,
    private _mailService: MailService,
  
  ) { 
    this.listCareersWithAgreements();
  }
  async create(createAgreementDto: CreateAgreementDto) {
    try {
      const agreement = await this._prismaService.agreement.create({
        data: {
          code: createAgreementDto.code,
          dateStart: createAgreementDto.dateStart,
          dateEnd: createAgreementDto.dateEnd,
          itvPath: createAgreementDto.itvPath,
          agreementPath: createAgreementDto.agreementPath,
          status: createAgreementDto.status,
          idCompany: createAgreementDto.idCompany,
          state: true,
        },
      });
      if (!agreement)
        throw new HttpException(
          'Error al crear el convenio',
          HttpStatus.BAD_REQUEST,
        );
      return agreement;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findAll(
    allActive?: boolean,
  ): Promise<AgreementDto[]> {
    try {
      const agreements = await this._prismaService.agreement.findMany({
        where: {
          state: allActive ? true : undefined
        },
        include:{
          company: true,
        },
        orderBy: {
          createdAt: 'desc',
        }
      });
      if (!agreements)
        return [];

      return agreements.map((agreement) => {
        return {
          id: agreement.id,
          code: agreement.code,
          dateStart: agreement.dateStart,
          dateEnd: agreement.dateEnd,
          company: agreement.company.name,
          status: agreement.status
        }
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number): Promise<AgreementEntity> {

    const agreement = await this._prismaService.agreement.findUnique({
      where: {
        id: id,
      },
      include: {
        company: true,
      }
    });
    if (!agreement)
      throw new HttpException(
        `Convenio con el id: ${id}, no existe`,
        HttpStatus.NOT_FOUND,
      );
    return agreement;

  }

  update(id: number, updateAgreementDto: UpdateAgreementDto) {
    return `This action updates a #${id} agreement`;
  }

  async verifyAgreementPerCaducity(id: number): Promise<number[]> {
    return [];
  }



  async listCareersWithAgreements() {
    const job = cron.schedule('0 0 7 * * 1', async () => {
      try {
        const careers = await this._prismaService.career.findMany();
        const agreementsCodes: string[] = [];
        if (!careers || careers.length === 0)
          throw new HttpException('No se encontraron carreras', HttpStatus.NOT_FOUND);

        const careersWithAgreements = [];

        for (const career of careers) {
          const { id, name, idCoordinator, idViceCoordinator, idRespStepDual } = career;

          const coordinator = await this._prismaService.user.findUnique({
            where: { id: idCoordinator },
          });
          const viceCoordinator = await this._prismaService.user.findUnique({
            where: { id: idViceCoordinator },
          });
          const responsible = await this._prismaService.user.findUnique({
            where: { id: idRespStepDual },
          });

          const coordinatorEmail = coordinator.email;
          const viceCoordinatorEmail = viceCoordinator.email;
          const responsibleEmail = responsible.email;

          const companies = await this._prismaService.company.findMany({
            where: {
              idCareer: id,
              state: true,
            },
            include: {
              agreement: {
                where: {
                  state: true,
                },
              },
            },
          });

          for (const company of companies) {
            const { agreement } = company;
            agreement.forEach((agreement) => {
              const { dateEnd } = agreement;
              const currentDate = new Date();
              if (this.getNumberWeeks(currentDate, dateEnd) <= career.timeRenovationAgreement && this.getNumberWeeks(currentDate, dateEnd) > 0) {
                agreementsCodes.push(agreement.code);
              }
            }
            );
          }

          console.log(agreementsCodes);

          if (agreementsCodes.length > 0) {
            await this._mailService.sendMailAgreementRenovation(coordinatorEmail, viceCoordinatorEmail, responsibleEmail, agreementsCodes);
          }
        }
      } catch (error) {
        throw new HttpException(error.message, error.status);
      }
    });
    job.start();
  }

  getNumberWeeks(dateStart: Date, dateEnd: Date): number {
    const diffTime = Math.abs(dateEnd.getTime() - dateStart.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    return weeks;
  }

  async remove(id: number): Promise<HttpException> {
    try {
      const agreement = this.findOne(id);
      if (!agreement) {
        throw new HttpException('El convenio no existe', HttpStatus.NOT_FOUND);
      }
      await this._prismaService.agreement.update({
        where: {
          id: id,
        },
        data: {
          state: false,
        },
      });

      return new HttpException('Convenio eliminado', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
