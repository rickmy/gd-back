import { PartialType } from '@nestjs/swagger';
import { CreateTemplateDocumentDto } from './create-template-document.dto';

export class UpdateTemplateDocumentDto extends PartialType(
  CreateTemplateDocumentDto,
) {}
