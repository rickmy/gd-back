import { TypeCareer } from '@prisma/client';

export class TypeCareerEntity implements TypeCareer {
  id: number;
  name: string;
  typeCareerId: string;
  createdAt: Date;
  updatedAt: Date;
  state: boolean;
}
