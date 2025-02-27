import { BadRequestException, Injectable } from '@nestjs/common';
import { TypeDocumentRepository } from '../repository/type-document.repository';
import { TypeDocumentDto } from '../dto/type-document.dto';
import { mapTypeDocumentToDto } from '../mappers/type-document.mapper';
import { UpdateTypeDocumentDto } from '../dto/update-type-document.dto';
import { CreateTypeDocumentDto } from '../dto/create-type-document.dto';

@Injectable()
export class TypeDocumentService {
  constructor(
    private readonly typeDocumentRepository: TypeDocumentRepository,
  ) {}

  async findAll(): Promise<TypeDocumentDto[]> {
    try {
      const typeDocuments = await this.typeDocumentRepository.findAll();
      if (!typeDocuments) {
        throw new BadRequestException('Type Documents not found');
      }
      return typeDocuments.map(mapTypeDocumentToDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(typeDocId: string): Promise<TypeDocumentDto> {
    try {
      const typeDocument = await this.typeDocumentRepository.findOne(typeDocId);
      return mapTypeDocumentToDto(typeDocument);
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(data: CreateTypeDocumentDto): Promise<TypeDocumentDto> {
    try {
      await this.validateNameNotExist(data.name);
      const typeDocument = await this.typeDocumentRepository.create(data);
      return mapTypeDocumentToDto(typeDocument);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(
    typeDocId: string,
    data: UpdateTypeDocumentDto,
  ): Promise<TypeDocumentDto> {
    try {
      await this.validateNameNotExist(data.name, typeDocId);
      const typeDocument = await this.typeDocumentRepository.update(
        typeDocId,
        data,
      );
      return mapTypeDocumentToDto(typeDocument);
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(typeDocId: string): Promise<TypeDocumentDto> {
    try {
      const typeDocument = await this.typeDocumentRepository.softDelete(
        typeDocId,
      );
      return mapTypeDocumentToDto(typeDocument);
    } catch (error) {
      throw new Error(error);
    }
  }

  async validateNameNotExist(name: string, modalityId?: string) {
    const career = await this.typeDocumentRepository.findByCondition(
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
