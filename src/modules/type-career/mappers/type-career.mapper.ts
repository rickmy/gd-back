import { TypeCareerDto } from '../dto/type-career.dto';
import { TypeCareerEntity } from '../entities/type-career.entity';

export const mapTypeCareerToDto = (
  typeCareer: TypeCareerEntity,
): TypeCareerDto => {
  return {
    typeCareerId: typeCareer.typeCareerId,
    name: typeCareer.name,
    state: typeCareer.state,
  };
};
