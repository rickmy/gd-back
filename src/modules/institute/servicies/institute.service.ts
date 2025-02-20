import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateInstituteDto } from '../dto/create-institute.dto';
import { UpdateInstituteDto } from '../dto/update-institute.dto';
import { InstituteDto } from '../dto/institute.dto';
import { PaginationResult } from 'src/core/models/paginationResult';
import { Prisma } from '@prisma/client';
import { FilterInstituteDto } from '../dto/filter.institute.dto';
import { mapInstituteToDto } from '../mappers/institute.mapper';
import { InstituteRepository } from '../repository/institute.repository';
import { InstituteValidator } from '../validation/institute.validator';

@Injectable()
export class InstituteService {
  constructor(
    private readonly instituteRepository: InstituteRepository,
    private readonly instituteValidator: InstituteValidator,
  ) {}

  async create(createInstituteDto: CreateInstituteDto): Promise<InstituteDto> {
    await this.instituteValidator.validateCodeNotExist(createInstituteDto.code);
    const institute = await this.instituteRepository.create(createInstituteDto);
    return mapInstituteToDto(institute);
  }

  async findAll(
    options: FilterInstituteDto,
    allActive?: boolean,
  ): Promise<PaginationResult<InstituteDto>> {
    try {
      const { page, limit } = options;

      const whereConditions = this.buildWhereConditions(options, allActive);

      const institutes = await this.instituteRepository.findAll(
        whereConditions,
        limit,
        page,
      );

      if (!institutes)
        throw new HttpException(
          'No se encontraron usuarios',
          HttpStatus.NO_CONTENT,
        );
      return {
        results: institutes.map(mapInstituteToDto),
        total: await this.instituteRepository.getTotalCount(allActive),
        page,
        limit,
      };
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  async findOne(instituteId: string): Promise<InstituteDto> {
    const institute = await this.instituteRepository.findById(instituteId);
    if (!institute) {
      throw new NotFoundException(`Institute with id ${instituteId} not found`);
    }
    return mapInstituteToDto(institute);
  }

  async findByCode(code: string) {
    const institute = await this.instituteRepository.findByCode(code);
    if (!institute) {
      throw new NotFoundException(`Institute with code ${code} not found`);
    }
    return mapInstituteToDto(institute);
  }

  async update(
    instituteId: string,
    updateInstituteDto: UpdateInstituteDto,
  ): Promise<string> {
    await this.instituteValidator.validateCodeNotExist(updateInstituteDto.code);
    await this.instituteRepository.update(instituteId, updateInstituteDto);
    return 'Institute updated successfully';
  }

  async remove(instituteId: string): Promise<string> {
    await this.instituteRepository.softDelete(instituteId);
    return 'Institute deleted successfully';
  }

  private buildWhereConditions(
    options: FilterInstituteDto,
    allActive?: boolean,
  ) {
    const hasFilter =
      !!options.name ||
      !!options.identification ||
      !!options.code ||
      !!options.codeAuth;
    return {
      state: allActive ? true : undefined,
      name: hasFilter
        ? { contains: options.name, mode: Prisma.QueryMode.insensitive }
        : undefined,
      code: hasFilter
        ? {
            contains: options.identification,
            mode: Prisma.QueryMode.insensitive,
          }
        : undefined,
      codeAuth: hasFilter
        ? { contains: options.codeAuth, mode: Prisma.QueryMode.insensitive }
        : undefined,
    };
  }
}
