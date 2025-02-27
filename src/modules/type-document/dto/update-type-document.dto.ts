import { PartialType } from '@nestjs/swagger';
import { CreateTypeDocumentDto } from './create-type-document.dto';

export class UpdateTypeDocumentDto extends PartialType(CreateTypeDocumentDto) {}
