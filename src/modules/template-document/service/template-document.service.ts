import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTemplateDocumentDto } from '../dto/create-template-document.dto';
import { UpdateTemplateDocumentDto } from '../dto/update-template-document.dto';
import { TemplateDocumentRepository } from '../repository/template-document.repository';
import { TemplateDocumentDto } from '../dto/template-document.dto';
import { mapTemplateToDto } from '../mappers/template-document.mapper';

@Injectable()
export class TemplateDocumentService {
  constructor(
    private readonly templateDocumentRepository: TemplateDocumentRepository,
  ) {}

  async create(
    createTemplateDocumentDto: CreateTemplateDocumentDto,
  ): Promise<TemplateDocumentDto> {
    try {
      await this.validateNameNotExist(createTemplateDocumentDto.name);
      const template = await this.templateDocumentRepository.create(
        createTemplateDocumentDto,
      );
      if (!template) {
        throw new BadRequestException('Error creating template');
      }
      return mapTemplateToDto(template, template.typeDoc.name);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(): Promise<TemplateDocumentDto[]> {
    try {
      const templates = await this.templateDocumentRepository.findAll();
      if (!templates) {
        throw new NotFoundException('Templates not found');
      }
      return templates.map((template) =>
        mapTemplateToDto(template, template.typeDoc.name),
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string): Promise<TemplateDocumentDto> {
    try {
      const template = await this.templateDocumentRepository.findOne(id);
      if (!template) {
        throw new NotFoundException('Template not found');
      }
      return mapTemplateToDto(template, template.typeDoc.name);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(
    id: string,
    updateTemplateDocumentDto: UpdateTemplateDocumentDto,
  ) {
    try {
      await this.validateNameNotExist(updateTemplateDocumentDto.name, id);
      const template = await this.templateDocumentRepository.update(
        id,
        updateTemplateDocumentDto,
      );
      if (!template) {
        throw new BadRequestException('Error updating template');
      }
      return mapTemplateToDto(template, template.typeDoc.name);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string): Promise<HttpException> {
    try {
      await this.templateDocumentRepository.softDelete(id);
      return new HttpException('Template deleted', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async validateNameNotExist(name: string, modalityId?: string) {
    const career = await this.templateDocumentRepository.findByCondition(
      name,
      modalityId,
    );
    if (career) {
      throw new BadRequestException(
        `Type Document with name ${name} already exists`,
      );
    }
  }
}
