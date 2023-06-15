import { RolHasPermission } from '@prisma/client';
export class RoleHasPermissionEntity implements RolHasPermission {
  idRol: number;
  idPermission: number;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  state: boolean;
}
