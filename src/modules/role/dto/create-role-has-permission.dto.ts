import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleHasPermissionDto {
  @IsNotEmpty()
  @IsString()
  rolId: string;

  @IsNotEmpty()
  @IsString()
  permissionId: string;

  @IsNotEmpty()
  @IsBoolean()
  state: boolean;
}
