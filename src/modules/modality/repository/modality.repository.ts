import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ModalityEntity } from '../entities/modality.entity';
import { CreateModalityDto } from '../dto/create-modality.dto';
import { UpdateModalityDto } from '../dto/update-modality.dto';

@Injectable()
export class ModalityRepository {
  constructor(private prismaService: PrismaService) {}

  async create(createModalityDto: CreateModalityDto): Promise<ModalityEntity> {
    return this.prismaService.modality.create({
      data: createModalityDto,
    });
  }

  async update(
    id: string,
    updateCareerDto: UpdateModalityDto,
  ): Promise<ModalityEntity> {
    return this.prismaService.modality.update({
      where: {
        modalityId: id,
      },
      data: updateCareerDto,
    });
  }

  async findAll(): Promise<ModalityEntity[]> {
    return this.prismaService.modality.findMany();
  }

  async findOne(id: string): Promise<ModalityEntity | null> {
    return this.prismaService.modality.findUnique({
      where: {
        modalityId: id,
      },
    });
  }

  async findByCondition(
    name: string,
    modalityId?: string,
  ): Promise<ModalityEntity | null> {
    return this.prismaService.career.findFirst({
      where: {
        name,
        modalityId: !!modalityId
          ? {
              not: modalityId,
            }
          : undefined,
      },
    });
  }

  async softDelete(id: string): Promise<ModalityEntity> {
    return this.prismaService.modality.update({
      where: {
        modalityId: id,
      },
      data: {
        state: false,
      },
    });
  }
}
