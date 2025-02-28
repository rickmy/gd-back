import { TemplateDocumentDto } from '../dto/template-document.dto';
import { TemplateDocumentEntity } from '../entities/template-document.entity';

export const mapTemplateToDto = (
  entity: TemplateDocumentEntity,
  typeDocumentName: string,
): TemplateDocumentDto => {
  return {
    templateId: entity.templateId,
    name: entity.name,
    typeDocId: entity.typeDocId,
    typeDoc: typeDocumentName,
    components: entity.components,
    state: entity.state,
  };
};
