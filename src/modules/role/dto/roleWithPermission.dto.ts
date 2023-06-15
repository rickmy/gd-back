import { PermissionEntity } from 'src/modules/permissions/entities/permission.entity';
import { RoleEntity } from '../entities/role.entity';

export class RoleWithPermission {
  role: RoleEntity;
  permissions: PermissionEntity[];
}
