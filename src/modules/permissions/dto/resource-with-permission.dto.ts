import { PermissionDto } from './permission.dto';

export class ResourceWithPermission {
  resource: string;
  permissions: PermissionDto[];
}
