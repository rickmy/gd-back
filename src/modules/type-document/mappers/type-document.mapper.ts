import { TypeDocumentDto } from '../dto/type-document.dto';
import { TypeDocumentEntity } from '../entities/type-document.entity';

export const mapTypeDocumentToDto = (
  entity: TypeDocumentEntity,
): TypeDocumentDto => {
  return {
    typeDocumentId: entity.typeDocId,
    name: entity.name,
    state: entity.state,
  };
};
