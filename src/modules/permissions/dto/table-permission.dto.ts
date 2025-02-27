import { PermissionDto } from './permission.dto';

export class TablePermissionDto {
  resource: string;
  permission: Array<PermissionDto>;
}
