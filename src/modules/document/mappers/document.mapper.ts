import { DocumentDto } from '../dto/document.dto';
import { DocumentEntity } from '../entities/document.entity';

export const mapDocumentToDto = (
  entity: DocumentEntity,
  typeDocName: string,
  userName: string,
): DocumentDto => {
  return {
    documentId: entity.documentId,
    code: entity.code,
    path: entity.path,
    content: entity.content,
    state: entity.state,
    typeDocId: entity.typeDocId,
    typeDoc: typeDocName,
    userId: entity.userId,
    userName,
  };
};
