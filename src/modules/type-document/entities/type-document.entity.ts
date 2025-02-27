import { TypeDoc } from 'prisma/prisma-client';

export class TypeDocumentEntity implements TypeDoc {
  id: number;
  name: string;
  typeDocId: string;
  createdAt: Date;
  updatedAt: Date;
  state: boolean;
}
