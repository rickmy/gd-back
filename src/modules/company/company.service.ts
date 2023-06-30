import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CompanyEntity } from './entities/company.entity';
import { CompaniesDto } from './dto/companies.dto';
import { StatusCompany } from '@prisma/client';
import { RoleService } from '../role/role.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';


@Injectable()
export class CompanyService {
  private logger = new Logger(CompanyService.name);
  
  constructor(
    private _prismaService: PrismaService,
    private _roleService: RoleService,
    private _userService: UserService,
    ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<CompanyEntity> {
    const role = await this._roleService.findRoleByName('EMP');
    const newUser: CreateUserDto = {
      dni: createCompanyDto.ruc,
      userName: createCompanyDto.ruc,
      email: createCompanyDto.email,
      password: this.hashPassword(createCompanyDto.ruc),
      idRol: role.id,
    };
    try {
      const user = await this._userService.create(newUser);
      this.logger.log('Usuario Creado correctamente')
      const company = await this._prismaService.company.create({
        data: {
          ruc: createCompanyDto.ruc,
          name: createCompanyDto.name,
          dniRepresentLegal: createCompanyDto.dniRepresentLegal,
          nameRepresentLegal: createCompanyDto.nameRepresentLegal,
          lastNameRepresentLegal: createCompanyDto.lastNameRepresentLegal,
          phone: createCompanyDto.phone,
          address: createCompanyDto.address,
          email: createCompanyDto.email,
          status: StatusCompany.ACTIVO,
          idCareer: createCompanyDto.idCareer,
          idUser: user.id,
        },
      });
      return company;
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
      await this._userService.remove(company.idUser);
      return new HttpException('La empresa ha sido eliminada', HttpStatus.OK);

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }
}
