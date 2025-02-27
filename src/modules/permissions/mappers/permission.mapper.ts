import { PermissionDto } from '../dto/permission.dto';
import { PermissionEntity } from '../entities/permission.entity';

export const mapPermissionToDto = (
  entity: PermissionEntity,
  actionName: string,
): PermissionDto => {
  return {
    permissionId: entity.permissionId,
    action: actionName,
    selected: false,
  };
};
