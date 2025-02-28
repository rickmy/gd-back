import { Template } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

export class TemplateDocumentEntity implements Template {
  id: number;
  templateId: string;
  name: string;
  typeDocId: string;
  components: JsonValue;
  createdAt: Date;
  updatedAt: Date;
  state: boolean;
}
