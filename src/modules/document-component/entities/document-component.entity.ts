import { DocumentComponent } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

export class DocumentComponentEntity implements DocumentComponent {
  id: number;
  documentComponentId: string;
  name: string;
  content: JsonValue;
  position: JsonValue;
  createdAt: Date;
  updatedAt: Date;
  state: boolean;
}
