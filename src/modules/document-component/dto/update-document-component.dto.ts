import { PartialType } from '@nestjs/swagger';
import { CreateDocumentComponentDto } from './create-document-component.dto';

export class UpdateDocumentComponentDto extends PartialType(
  CreateDocumentComponentDto,
) {}
