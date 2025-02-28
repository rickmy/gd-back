import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocumentComponentDto } from '../dto/create-document-component.dto';
import { UpdateDocumentComponentDto } from '../dto/update-document-component.dto';

@Injectable()
export class DocumentComponentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.documentComponent.findMany();
  }

  findOne(documentComponentId: string) {
    return this.prismaService.documentComponent.findUnique({
      where: { documentComponentId },
    });
  }

  async create(data: CreateDocumentComponentDto) {
    return this.prismaService.documentComponent.create({
      data,
    });
  }

  async update(documentComponentId: string, data: UpdateDocumentComponentDto) {
    return this.prismaService.documentComponent.update({
      where: { documentComponentId },
      data,
    });
  }

  async softDelete(documentComponentId: string) {
    return this.prismaService.documentComponent.update({
      where: { documentComponentId },
      data: { state: false },
    });
  }

  async findByCondition(name: string, documentComponentId?: string) {
    return this.prismaService.documentComponent.findFirst({
      where: {
        name,
        documentComponentId: !!documentComponentId
          ? {
              not: documentComponentId,
            }
          : undefined,
      },
    });
  }
}
