import { ResourceWithPermission } from '@modules/permissions/dto/resource-with-permission.dto';
import { RoleWithPermission } from '../dto/roleWithPermission.dto';
import { RoleEntity } from '../entities/role.entity';

export const mapRolToDto = (
  rol: RoleEntity,
  permission: ResourceWithPermission[],
): RoleWithPermission => {
  return {
    rolId: rol.rolId,
    code: rol.code,
    name: rol.name,
    state: rol.state,
    permissions: permission,
  };
};
