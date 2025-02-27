import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypeCareerDto } from '../dto/create-type-career.dto';
import { UpdateTypeCareerDto } from '../dto/update-type-career.dto';

@Injectable()
export class TypeCareerRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.typeCareer.findMany();
  }

  findOne(typeCareerId: string) {
    return this.prismaService.typeCareer.findUnique({
      where: { typeCareerId },
    });
  }

  async create(data: CreateTypeCareerDto) {
    return this.prismaService.typeCareer.create({ data });
  }

  async update(typeCareerId: string, data: UpdateTypeCareerDto) {
    return this.prismaService.typeCareer.update({
      where: { typeCareerId },
      data,
    });
  }

  async softDelete(typeCareerId: string) {
    return this.prismaService.typeCareer.update({
      where: { typeCareerId },
      data: { state: false },
    });
  }

  async findByCondition(name: string, typeCareerId?: string) {
    return this.prismaService.typeCareer.findFirst({
      where: {
        name,
        typeCareerId: !!typeCareerId
          ? {
              not: typeCareerId,
            }
          : undefined,
      },
    });
  }
}
