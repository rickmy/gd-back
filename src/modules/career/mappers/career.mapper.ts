import { CareerDto } from '../dto/career.dto';
import { CareerEntity } from '../entities/career.entity';

export const mapCareerMapper = (
  entity: CareerEntity,
  institute: string,
  modality: string,
  typeCareer: string,
): CareerDto => {
  return {
    careerId: entity.careerId,
    code: entity.code,
    codeAuth: entity.codeAuth,
    resolutionNumber: entity.resolutionNumber,
    name: entity.name,
    titleAwarded: entity.titleAwarded,
    state: entity.state,
    instituteId: entity.instituteId,
    institute: institute,
    modalityId: entity.modalityId,
    modality: modality,
    typeCareerId: entity.typeCareerId,
    typeCareer: typeCareer,
  };
};
