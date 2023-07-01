import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAgreementDto } from './dto/create-agreement.dto';
import { UpdateAgreementDto } from './dto/update-agreement.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AgreementEntity } from './entities/agreement.entity';

@Injectable()
export class AgreementService {

  constructor(
    private  _prismaService: PrismaService
    ) { }
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
