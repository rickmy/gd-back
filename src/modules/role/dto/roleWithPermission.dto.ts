import { ResourceWithPermission } from '@modules/permissions/dto/resource-with-permission.dto';
import { IsArray, IsString } from 'class-validator';

export class RoleWithPermission {
  @IsString({
    message: 'el id del rol debe ser un string',
  })
  rolId: string;
  @IsString({
    message: 'el codigo del rol debe ser un string',
  })
  code: string;
  @IsString({
    message: 'el nombre del rol debe ser un string',
  })
  name: string;
  @IsArray({
    message: 'los permisos deben ser un array',
  })
  permissions: ResourceWithPermission[];
}
