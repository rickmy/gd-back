import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAgreementDto } from './dto/create-agreement.dto';
import { UpdateAgreementDto } from './dto/update-agreement.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AgreementEntity } from './entities/agreement.entity';
import { MailService } from '../mail/mail.service';
const cron = require('node-cron');

@Injectable()
export class AgreementService {

  constructor(
    private _prismaService: PrismaService,
    private _mailService: MailService,
  
  ) { 
    this.listCareersWithAgreements();
  }
  create(createAgreementDto: CreateAgreementDto) {
    return 'This action adds a new agreement';
  }

  async findAll() {
    return await this._prismaService.agreement.findMany();
  }

  async findOne(id: number): Promise<AgreementEntity> {

    const agreement = await this._prismaService.agreement.findUnique({
      where: {
        id: id,
      },
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
