import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDocumentComponentDto } from '../dto/create-document-component.dto';
import { UpdateDocumentComponentDto } from '../dto/update-document-component.dto';
import { DocumentComponentRepository } from '../repository/document-component.repository';
import { DocumentComponentDto } from '../dto/document-component.dto';
import { mapDocumentComponentToDto } from '../mappers/document-component.mapper';

@Injectable()
export class DocumentComponentService {
  constructor(
    private readonly documentComponentRepository: DocumentComponentRepository,
  ) {}

  async create(
    createDocumentComponentDto: CreateDocumentComponentDto,
  ): Promise<DocumentComponentDto> {
    try {
      await this.validateNameNotExist(createDocumentComponentDto.name);
      const documentComponent = await this.documentComponentRepository.create(
        createDocumentComponentDto,
      );
      if (!documentComponent) {
        throw new BadRequestException('Error creating document component');
      }
      return mapDocumentComponentToDto(documentComponent);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(): Promise<DocumentComponentDto[]> {
    try {
      const documentComponents =
        await this.documentComponentRepository.findAll();
      if (!documentComponents) {
        throw new NotFoundException('Document components not found');
      }
      return documentComponents.map(mapDocumentComponentToDto);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string): Promise<DocumentComponentDto> {
    try {
      const documentComponent = await this.documentComponentRepository.findOne(
        id,
      );
      if (!documentComponent) {
        throw new NotFoundException('Document component not found');
      }
      return mapDocumentComponentToDto(documentComponent);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(
    id: string,
    updateDocumentComponentDto: UpdateDocumentComponentDto,
  ): Promise<DocumentComponentDto> {
    try {
      await this.validateNameNotExist(updateDocumentComponentDto.name, id);
      const documentComponent = await this.documentComponentRepository.update(
        id,
        updateDocumentComponentDto,
      );
      if (!documentComponent) {
        throw new BadRequestException('Error updating document component');
      }
      return mapDocumentComponentToDto(documentComponent);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string): Promise<HttpException> {
    try {
      await this.documentComponentRepository.softDelete(id);
      return new HttpException('Document component deleted', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async validateNameNotExist(name: string, id?: string) {
    const career = await this.documentComponentRepository.findByCondition(
      name,
      id,
    );
    if (career) {
      throw new BadRequestException(
        `Type Document component with name ${name} already exists`,
      );
    }
  }
}
