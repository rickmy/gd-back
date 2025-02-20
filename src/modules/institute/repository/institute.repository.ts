import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Institute, Prisma } from '@prisma/client';
import { getSkip, getTake } from 'src/core/utils/pagination.utils';

@Injectable()
export class InstituteRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(instituteData: any): Promise<Institute> {
    return this.prismaService.institute.create({
      data: instituteData,
    });
  }

  async findByCode(code: string): Promise<Institute | null> {
    return this.prismaService.institute.findUnique({
      where: { code },
    });
  }

  async findById(instituteId: string): Promise<Institute | null> {
    return this.prismaService.institute.findUnique({
      where: { instituteId },
    });
  }

  async findAll(
    whereConditions: any,
    limit: number,
    page: number,
  ): Promise<Institute[]> {
    return this.prismaService.institute.findMany({
      where: whereConditions,
      orderBy: {
        createdAt: Prisma.SortOrder.desc,
      },
      take: getTake(limit, whereConditions),
      skip: getSkip(page, whereConditions),
    });
  }

  async update(instituteId: string, updateData: any): Promise<Institute> {
    return this.prismaService.institute.update({
      where: { instituteId },
      data: updateData,
    });
  }

  async softDelete(instituteId: string): Promise<Institute> {
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
