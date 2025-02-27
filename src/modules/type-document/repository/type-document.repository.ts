import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTypeDocumentDto } from '../dto/create-type-document.dto';
import { UpdateTypeDocumentDto } from '../dto/update-type-document.dto';

@Injectable()
export class TypeDocumentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.typeDoc.findMany();
  }

  findOne(typeDocId: string) {
    return this.prismaService.typeDoc.findUnique({
      where: { typeDocId },
    });
  }

  async create(data: CreateTypeDocumentDto) {
    return this.prismaService.typeDoc.create({ data });
  }

  async update(typeDocId: string, data: UpdateTypeDocumentDto) {
    return this.prismaService.typeDoc.update({
      where: { typeDocId },
      data,
    });
  }

  async softDelete(typeDocId: string) {
    return this.prismaService.typeDoc.update({
      where: { typeDocId },
      data: { state: false },
    });
  }

  async findByCondition(name: string, typeDocId?: string) {
    return this.prismaService.typeDoc.findFirst({
      where: {
        name,
        typeDocId: !!typeDocId
          ? {
              not: typeDocId,
            }
          : undefined,
      },
    });
  }
}
