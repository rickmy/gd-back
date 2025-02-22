import { CareerEntity } from '../entities/career.entity';
import { CreateCareerDto } from '../dto/create-career.dto';
import { Career, Prisma } from '@prisma/client';
import { getSkip, getTake } from '@core/utils/pagination.utils';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CareerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(careerData: CreateCareerDto) {
    return this.prismaService.career.create({
      data: careerData,
      include: {
        institute: true,
        modality: true,
        typeCareer: true,
      },
    });
  }

  async findByCode(code: string): Promise<CareerEntity | null> {
    return this.prismaService.career.findUnique({
      where: { code },
    });
  }

  async findByCondition(
    code: string,
    resolutionNumber: string,
    codeAuth: string,
  ): Promise<CareerEntity | null> {
    return this.prismaService.career.findFirst({
      where: {
        codeAuth,
        resolutionNumber,
        code,
      },
    });
  }

  async findById(careerId: string): Promise<CareerEntity | null> {
    return this.prismaService.career.findUnique({
      where: { careerId },
      include: {
        institute: true,
        modality: true,
        typeCareer: true,
      },
    });
  }

  async findAll<T>(whereConditions: T, limit: number, page: number) {
    return this.prismaService.career.findMany({
      where: whereConditions,
      orderBy: {
        createdAt: Prisma.SortOrder.desc,
      },
      take: getTake(limit, whereConditions),
      skip: getSkip(page, limit, whereConditions),
      include: {
        institute: true,
        modality: true,
        typeCareer: true,
      },
    });
  }

  async update(careerId: string, careerData: any): Promise<CareerEntity> {
    return this.prismaService.career.update({
      where: { careerId },
      data: careerData,
    });
  }

  async softDelete(careerId: string): Promise<CareerEntity> {
    return this.prismaService.career.update({
      where: { careerId },
      data: { state: false },
    });
  }

  async getTotalCount(allActive?: boolean): Promise<number> {
    return this.prismaService.career.count({
      where: { state: allActive ? true : undefined },
    });
  }
}
