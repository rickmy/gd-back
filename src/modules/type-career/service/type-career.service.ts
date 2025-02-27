import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTypeCareerDto } from '../dto/create-type-career.dto';
import { UpdateTypeCareerDto } from '../dto/update-type-career.dto';
import { TypeCareerRepository } from '../repository/type-career.repository';
import { TypeCareerDto } from '../dto/type-career.dto';
import { mapTypeCareerToDto } from '../mappers/type-career.mapper';

@Injectable()
export class TypeCareerService {
  constructor(private readonly typeCareerRepository: TypeCareerRepository) {}
  async create(
    createTypeCareerDto: CreateTypeCareerDto,
  ): Promise<TypeCareerDto> {
    await this.typeCareerRepository.findByCondition(createTypeCareerDto.name);
    const typeCareer = await this.typeCareerRepository.create(
      createTypeCareerDto,
    );
    return typeCareer;
  }

  async findAll(): Promise<TypeCareerDto[]> {
    try {
      const typeCareer = await this.typeCareerRepository.findAll();
      if (!typeCareer) {
        throw new NotFoundException('No se encontraron registros');
      }
      return typeCareer.map(mapTypeCareerToDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string): Promise<TypeCareerDto> {
    try {
      const typeCareer = await this.typeCareerRepository.findOne(id);
      if (!typeCareer) {
        throw new NotFoundException('No se encontraron registros');
      }
      return mapTypeCareerToDto(typeCareer);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(
    id: string,
    updateTypeCareerDto: UpdateTypeCareerDto,
  ): Promise<TypeCareerDto> {
    try {
      const update = await this.typeCareerRepository.update(
        id,
        updateTypeCareerDto,
      );
      if (!update) {
        throw new NotFoundException('No se encontraron registros');
      }
      return mapTypeCareerToDto(update);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string): Promise<HttpException> {
    try {
      const deleted = await this.typeCareerRepository.softDelete(id);
      if (!deleted) {
        throw new NotFoundException('No se encontraron registros');
      }
      return new HttpException('Registro eliminado', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
