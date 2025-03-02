import { Career } from '@prisma/client';

export class CareerEntity implements Career {
  id: number;
  careerId: string;
  code: string;
  codeAuth: string;
  resolutionNumber: string;
  name: string;
  titleAwarded: string;
  createdAt: Date;
  updatedAt: Date;
  state: boolean;
  instituteId: string;
  modalityId: string;
  typeCareerId: string;
}
