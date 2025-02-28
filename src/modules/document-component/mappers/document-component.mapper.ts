import { DocumentComponentDto } from '../dto/document-component.dto';
import { DocumentComponentEntity } from '../entities/document-component.entity';

export const mapDocumentComponentToDto = (
  entity: DocumentComponentEntity,
): DocumentComponentDto => {
  return {
    documentComponentId: entity.documentComponentId,
    name: entity.name,
    content: entity.content,
    position: entity.position,
    state: entity.state,
  };
};
