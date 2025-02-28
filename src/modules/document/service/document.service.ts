import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDocumentDto } from '../dto/create-document.dto';
import { UpdateDocumentDto } from '../dto/update-document.dto';
import { DocumentRepository } from '../repository/document.repository';
import { DocumentDto } from '../dto/document.dto';
import { mapDocumentToDto } from '../mappers/document.mapper';

@Injectable()
export class DocumentService {
  constructor(private readonly documentRepository: DocumentRepository) {}
  async create(createDocumentDto: CreateDocumentDto): Promise<DocumentDto> {
    try {
      await this.validateCodeNotExist(createDocumentDto.code);
      const document = await this.documentRepository.create(createDocumentDto);
      return mapDocumentToDto(
        document,
        document.typeDoc.name,
        document.user.completeName,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll(): Promise<DocumentDto[]> {
    try {
      const documents = await this.documentRepository.findAll();
      if (!documents) throw new NotFoundException('Documents not found');
      return documents.map((document) =>
        mapDocumentToDto(
          document,
          document.typeDoc.name,
          document.user.completeName,
        ),
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: string): Promise<DocumentDto> {
    try {
      const document = await this.documentRepository.findOne(id);
      if (!document) throw new NotFoundException('Document not found');
      return mapDocumentToDto(
        document,
        document.typeDoc.name,
        document.user.completeName,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(
    id: string,
    updateDocumentDto: UpdateDocumentDto,
  ): Promise<DocumentDto> {
    try {
      await this.validateCodeNotExist(updateDocumentDto.code, id);
      const document = await this.documentRepository.update(
        id,
        updateDocumentDto,
      );
      return mapDocumentToDto(
        document,
        document.typeDoc.name,
        document.user.completeName,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: string): Promise<HttpException> {
    try {
      await this.documentRepository.softDelete(id);
      return new HttpException('Document removed', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async validateCodeNotExist(code: string, id?: string) {
    const career = await this.documentRepository.findByCondition(code, id);
    if (career) {
      throw new BadRequestException(
        `Type Document with name ${name} already exists`,
      );
    }
  }
}
