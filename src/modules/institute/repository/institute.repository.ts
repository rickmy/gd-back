import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { getSkip, getTake } from 'src/core/utils/pagination.utils';
import { InstituteEntity } from '../entities/institute.entity';
import { CreateInstituteDto } from '../dto/create-institute.dto';
import { UpdateInstituteDto } from '../dto/update-institute.dto';

@Injectable()
export class InstituteRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(instituteData: CreateInstituteDto): Promise<InstituteEntity> {
    return this.prismaService.institute.create({
      data: instituteData,
    });
  }

  async findByCode(code: string): Promise<InstituteEntity | null> {
    return this.prismaService.institute.findUnique({
      where: { code },
    });
  }

  async findById(instituteId: string): Promise<InstituteEntity | null> {
    return this.prismaService.institute.findUnique({
      where: { instituteId },
    });
  }

  async findAll<T>(
    whereConditions: T,
    limit: number,
    page: number,
  ): Promise<InstituteEntity[]> {
    return this.prismaService.institute.findMany({
      where: whereConditions,
      orderBy: {
        createdAt: Prisma.SortOrder.desc,
      },
      take: getTake(limit, whereConditions),
      skip: getSkip(page, limit, whereConditions),
    });
  }

  async update(
    instituteId: string,
    updateData: UpdateInstituteDto,
  ): Promise<InstituteEntity> {
    return this.prismaService.institute.update({
      where: { instituteId },
      data: updateData,
    });
  }

  async softDelete(instituteId: string): Promise<InstituteEntity> {
    return this.prismaService.institute.update({
      where: { instituteId },
      data: { state: false },
    });
  }

  async getTotalCount(allActive?: boolean): Promise<number> {
    return this.prismaService.institute.count({
      where: { state: allActive ? true : undefined },
    });
  }
}
