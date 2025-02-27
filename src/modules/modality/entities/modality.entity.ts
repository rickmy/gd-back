import { Modality } from '@prisma/client';

export class ModalityEntity implements Modality {
  id: number;
  name: string;
  modalityId: string;
  createdAt: Date;
  updatedAt: Date;
  state: boolean;
}
