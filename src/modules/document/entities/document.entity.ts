import { Document } from '@prisma/client';
import { JsonValue } from '@prisma/client/runtime/library';

export class DocumentEntity implements Document {
  id: number;
  documentId: string;
  code: string;
  path: string;
  createdAt: Date;
  updatedAt: Date;
  content: JsonValue;
  state: boolean;
  templateId: string;
  typeDocId: string;
  userId: string;
}
