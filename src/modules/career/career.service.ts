import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CareerDto } from './dto/career.dto';
import { CareerEntity } from './entities/career.entity';

@Injectable()
export class CareerService {
  private logger = new Logger(CareerService.name);
  constructor(private _prismaService: PrismaService) {}
  async create(createCareerDto: CreateCareerDto): Promise<CareerDto> {
    try {
      const career = await this._prismaService.career.create({
        data: {
          ...createCareerDto,
        },
      });
      if (!career)
        throw new HttpException(
          'No se pudo crear la carrera',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      
      return career;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(allActive?: boolean): Promise<CareerEntity[]> {
    try {
      const careersDB = await this._prismaService.career.findMany({
        where: {
          state: allActive ? true : undefined,
        },
        orderBy: {
          name: 'asc',
        },
      });
      if(!careersDB || careersDB.length === 0)
        throw new HttpException('No se encontraron carreras', HttpStatus.NOT_FOUND);
      this.logger.log('Carreras encontradas correctamente');
      return careersDB;
    } catch (error) {
      console.log(error);
      
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number): Promise<CareerDto> {
    try {
      const careerDB = await this._prismaService.career.findUnique({
        where: {
          id: id,
        },
      });
      if (!careerDB)
        throw new HttpException(
          'No se encontró la carrera',
          HttpStatus.NOT_FOUND,
        );
      const careerDto: CareerDto = {
        ...careerDB,  
      };
      return careerDto;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findByCode(code: string): Promise<CareerEntity> {
    try {
      const careerDB = await this._prismaService.career.findUnique({
        where: {
          code: code,
        },
      });
      return careerDB;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(
    id: number,
    updateCareerDto: UpdateCareerDto,
  ): Promise<CareerDto> {
    try {
      const careerDB = await this._prismaService.career.findUnique({
        where: {
          id: id,
        },
      });
      if (!careerDB)
        throw new HttpException(
          'No se encontró la carrera',
          HttpStatus.NOT_FOUND,
        );
      const career = await this._prismaService.career.update({
        where: {
          id: id,
        },
        data: {
          ...updateCareerDto,
        },
      });
      if (!career)
        throw new HttpException(
          'No se pudo actualizar la carrera',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      return career;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: number) {
    try {
      const careerDB = await this._prismaService.career.findUnique({
        where: {
          id: id,
        },
      });
      if (!careerDB)
        throw new HttpException(
          'No se encontró la carrera',
          HttpStatus.NOT_FOUND,
        );
      const career = await this._prismaService.career.update({
        where: {
          id: id,
        },
        data: {
          state: false,
        },
      });
      if (!career)
        throw new HttpException(
          'No se pudo eliminar la carrera',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      return new HttpException(
        'Carrera eliminada correctamente',
        HttpStatus.OK,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
