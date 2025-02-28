import { JsonValue } from '@prisma/client/runtime/library';

export class DocumentComponentDto {
  documentComponentId: string;
  name: string;
  content: JsonValue;
  position: JsonValue;
  state: boolean;
}
