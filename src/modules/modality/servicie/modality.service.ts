import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateModalityDto } from '../dto/create-modality.dto';
import { UpdateModalityDto } from '../dto/update-modality.dto';
import { ModalityRepository } from '../repository/modality.repository';
import { ModalityDto } from '../dto/modality.dto';
import { mapModalityToDto } from '../mappers/mapModalityToDto';

@Injectable()
export class ModalityService {
  constructor(private readonly modalityRepository: ModalityRepository) {}
  async create(createModalityDto: CreateModalityDto) {
    await this.validateNameNotExist(createModalityDto.name);
    return await this.modalityRepository.create(createModalityDto);
  }

  async findAll(): Promise<ModalityDto[]> {
    try {
      const modalities = await this.modalityRepository.findAll();
      return modalities.map(mapModalityToDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string): Promise<ModalityDto> {
    try {
      const modality = await this.modalityRepository.findOne(id);
      if (!modality) {
        throw new NotFoundException('Modality not found');
      }
      return mapModalityToDto(modality);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(
    id: string,
    updateModalityDto: UpdateModalityDto,
  ): Promise<ModalityDto> {
    try {
      const update = await this.modalityRepository.update(
        id,
        updateModalityDto,
      );
      return mapModalityToDto(update);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string): Promise<HttpException> {
    try {
      await this.modalityRepository.softDelete(id);
      return new HttpException('Modality deleted', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async validateNameNotExist(name: string, modalityId?: string) {
    const career = await this.modalityRepository.findByCondition(
      name,
      modalityId,
    );
    if (career) {
      throw new BadRequestException(
        `Modality with name ${name} already exists`,
      );
    }
  }
}
