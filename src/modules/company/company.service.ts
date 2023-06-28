import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyEntity } from './entities/company.entity';
import { CompaniesDto } from './dto/companies.dto';
import { StatusCompany } from '@prisma/client';

@Injectable()
export class CompanyService {
  constructor(private _prismaService: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<CompanyEntity> {

    try {
      const createdCompany = await this._prismaService.company.create({
        data: {
          ruc: createCompanyDto.ruc,
          name: createCompanyDto.name,
          address: createCompanyDto.address,
          phone: createCompanyDto.phone,
          email: createCompanyDto.email,
          dniRepresentLegal: createCompanyDto.dniRepresentLegal,
          nameRepresentLegal: createCompanyDto.nameRepresentLegal,
          lastNameRepresentLegal: createCompanyDto.lastNameRepresentLegal,
          status: createCompanyDto.status,
          idCareer: createCompanyDto.idCareer,
          idUser: createCompanyDto.idUser,
        },
      });
      return createdCompany;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async updateStatusCompany(
    id: number,
    status: StatusCompany,
  ):Promise<CompanyEntity>{
    try {
      const company = await this._prismaService.company.update({
        where: {
          id: id,
        },
        data: {
          status: status,
        },
      });
      return company;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findAll() {
    return await this._prismaService.company.findMany();
  }

  async findOne(id: number): Promise<CompanyEntity> {
    const companyExists = await this.findOne(id);
    if (!companyExists) {
      throw new HttpException('La empresa no existe', HttpStatus.NOT_FOUND);
    }
    try {
      return await this._prismaService.company.findFirstOrThrow({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto):Promise<CompanyEntity> {
    
    const companyExists = await this.findOne(id);
    if (!companyExists) {
      throw new HttpException('La empresa no existe', HttpStatus.NOT_FOUND);
    }
    try {
      return await this._prismaService.company.update({
        where: {
          id: id,
        },
        data: updateCompanyDto,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async remove(id: number): Promise<HttpException> {

    try {
      const company = await this.findOne(id);
      if (!company) {
        throw new HttpException('La empresa no existe', HttpStatus.NOT_FOUND);
      }
      await this._prismaService.company.update({
        where: {
          id: id,
        },
        data: {
          state: false,
        },
      });
      return new HttpException('La empresa ha sido eliminada', HttpStatus.OK);

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
