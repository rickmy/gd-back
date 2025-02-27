import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateCareerDto } from '../dto/create-career.dto';
import { UpdateCareerDto } from '../dto/update-career.dto';
import { CareerRepository } from '../repository/career.repository';
import { FilterCareerDto } from '../dto/filter-career.dto';
import {
  buildContainsCondition,
  buildContainsNameCondition,
} from '@core/utils/buildWhereCondition.utils';
import { mapCareerMapper } from '../mappers/career.mapper';
import { CareerDto } from '../dto/career.dto';

@Injectable()
export class CareerService {
  constructor(private careerRepository: CareerRepository) {}
  async create(createCareerDto: CreateCareerDto) {
    await this.validateCodeNotExist(
      createCareerDto.code,
      createCareerDto.resolutionNumber,
      createCareerDto.codeAuth,
    );
    const career = await this.careerRepository.create(createCareerDto);
    if (!career) {
      throw new HttpException('Career not created', HttpStatus.BAD_REQUEST);
    }
    return mapCareerMapper(
      career,
      career.institute.name,
      career.modality.name,
      career.typeCareer.name,
    );
  }

  async findAll(options: FilterCareerDto, allActive?: boolean) {
    try {
      const { page, limit } = options;

      const whereConditions = this.buildWhereConditions(options);

      const careers = await this.careerRepository.findAll(
        whereConditions,
        limit,
        page,
      );

      if (!careers)
        throw new HttpException('Not found careers', HttpStatus.NO_CONTENT);
      return {
        results: careers.map((career) =>
          mapCareerMapper(
            career,
            career.institute.name,
            career.modality.name,
            career.typeCareer.name,
          ),
        ),
        total: await this.careerRepository.getTotalCount(allActive),
        page,
        limit,
      };
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  async findOne(id: string) {
    const career = await this.careerRepository.findById(id);
    if (!career) {
      throw new HttpException('Career not found', HttpStatus.NOT_FOUND);
    }
    return mapCareerMapper(
      career,
      career.institute.name,
      career.modality.name,
      career.typeCareer.name,
    );
  }

  async update(
    id: string,
    updateCareerDto: UpdateCareerDto,
  ): Promise<CareerDto> {
    await this.validateCodeNotExist(
      updateCareerDto.code,
      updateCareerDto.resolutionNumber,
      updateCareerDto.codeAuth,
      id,
    );
    const career = await this.careerRepository.update(id, updateCareerDto);
    return mapCareerMapper(
      career,
      career.institute.name,
      career.modality.name,
      career.typeCareer.name,
    );
  }

  async remove(id: string) {
    await this.careerRepository.softDelete(id);
    return new HttpException('Career deleted successfully', HttpStatus.OK);
  }

  async validateCodeNotExist(
    code: string,
    resolutionNumber: string,
    codeAuth: string,
    careerId?: string,
  ) {
    const career = await this.careerRepository.findByCondition(
      code,
      resolutionNumber,
      codeAuth,
      careerId,
    );
    if (career) {
      throw new BadRequestException(
        `Institute with code ${code} already exists`,
      );
    }
  }

  private buildWhereConditions(options: FilterCareerDto) {
    return {
      codeAuth: buildContainsCondition(options.codeAuth),
      resolutionNumber: buildContainsCondition(options.resolutionNumber),
      institute: buildContainsNameCondition('name', options.institute),
      modality: buildContainsNameCondition('name', options.modality),
      typeCareer: buildContainsNameCondition('name', options.typeCareer),
    };
  }
}
