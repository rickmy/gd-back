import { InstituteDto } from '../dto/institute.dto';
import { InstituteEntity } from '../entities/institute.entity';

export const mapInstituteToDto = (institute: InstituteEntity): InstituteDto => {
  return {
    instituteId: institute.instituteId,
    code: institute.code,
    codeAuth: institute.codeAuth,
    name: institute.name,
    createdAt: institute.createdAt,
    updatedAt: institute.updatedAt,
    state: institute.state,
  };
};
