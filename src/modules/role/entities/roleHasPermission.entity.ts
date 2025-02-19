import { RolHasPermission } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
export class RoleHasPermissionEntity implements RolHasPermission {
  rolId: string;
  @ApiProperty({ description: 'ID of the permission' })
  permissionId: string;
  @ApiProperty({ description: 'Creation date', readOnly: true })
  createdAt: Date;
  @ApiProperty({ description: 'Update date', readOnly: true })
  updatedAt: Date;
  @ApiProperty({ description: 'State of the permission' })
  state: boolean;
}
