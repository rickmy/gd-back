import { ResourceWithPermission } from '@modules/permissions/dto/resource-with-permission.dto';
import { IsArray, IsBoolean, IsString } from 'class-validator';

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
  @IsBoolean({
    message: 'el estado del rol debe ser un boolean',
  })
  state: boolean;
  @IsArray({
    message: 'los permisos deben ser un array',
  })
  permissions: ResourceWithPermission[];
}
