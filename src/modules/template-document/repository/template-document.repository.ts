import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTemplateDocumentDto } from '../dto/create-template-document.dto';
import { UpdateTemplateDocumentDto } from '../dto/update-template-document.dto';

@Injectable()
export class TemplateDocumentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.template.findMany({
      include: {
        typeDoc: true,
      },
    });
  }

  findOne(templateId: string) {
    return this.prismaService.template.findUnique({
      where: { templateId },
      include: {
        typeDoc: true,
      },
    });
  }

  async create(data: CreateTemplateDocumentDto) {
    return this.prismaService.template.create({
      data,
      include: { typeDoc: true },
    });
  }

  async update(templateId: string, data: UpdateTemplateDocumentDto) {
    return this.prismaService.template.update({
      where: { templateId },
      data,
      include: { typeDoc: true },
    });
  }

  async softDelete(templateId: string) {
    return this.prismaService.template.update({
      where: { templateId },
      data: { state: false },
    });
  }

  async findByCondition(name: string, templateId?: string) {
    return this.prismaService.template.findFirst({
      where: {
        name,
        templateId: !!templateId
          ? {
              not: templateId,
            }
          : undefined,
      },
    });
  }
}
