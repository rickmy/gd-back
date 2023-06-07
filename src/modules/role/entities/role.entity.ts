import { Rol } from '@prisma/client';

export class RoleEntity implements Rol {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  state: boolean;
}
