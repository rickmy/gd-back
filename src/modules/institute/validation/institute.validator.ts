import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { InstituteRepository } from '../repository/institute.repository';

@Injectable()
export class InstituteValidator {
  constructor(private readonly instituteRepository: InstituteRepository) {}

  async validateCodeNotExist(code: string) {
    const institute = await this.instituteRepository.findByCode(code);
    if (institute) {
      throw new BadRequestException(
        `Institute with code ${code} already exists`,
      );
    }
  }
}
