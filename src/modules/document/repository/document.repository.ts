import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDocumentDto } from '../dto/create-document.dto';
import { UpdateDocumentDto } from '../dto/update-document.dto';

@Injectable()
export class DocumentRepository {
  constructor(private readonly prismaService: PrismaService) {}
  findAll() {
    return this.prismaService.document.findMany({
      include: {
        typeDoc: true,
        user: true,
      },
    });
  }

  findOne(documentId: string) {
    return this.prismaService.document.findUnique({
      where: { documentId },
      include: {
        typeDoc: true,
        user: true,
      },
    });
  }

  async create(data: CreateDocumentDto) {
    return this.prismaService.document.create({
      data,
      include: {
        typeDoc: true,
        user: true,
      },
    });
  }

  async update(documentId: string, data: UpdateDocumentDto) {
    return this.prismaService.document.update({
      where: { documentId },
      data,
      include: {
        typeDoc: true,
        user: true,
      },
    });
  }

  async softDelete(documentId: string) {
    return this.prismaService.document.update({
      where: { documentId },
      data: { state: false },
    });
  }

  async findByCondition(code: string, documentId?: string) {
    return this.prismaService.document.findFirst({
      where: {
        code,
        documentId: !!documentId
          ? {
              not: documentId,
            }
          : undefined,
      },
    });
  }
}
