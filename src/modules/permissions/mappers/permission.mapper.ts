import { PermissionDto } from '../dto/permission.dto';
import { PermissionEntity } from '../entities/permission.entity';

export const mapPermissionToDto = (
  entity: PermissionEntity,
  actionName: string,
  resourceName: string,
): PermissionDto => {
  return {
    permissionId: entity.permissionId,
    actionId: entity.actionId,
    action: actionName,
    resourceId: entity.resourceId,
    resource: resourceName,
    state: entity.state,
  };
};
