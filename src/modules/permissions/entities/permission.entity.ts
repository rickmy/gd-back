import { Permission } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class PermissionEntity implements Permission {
  @ApiProperty({ example: 1, description: 'Permission id', readOnly: true })
  id: number;
  @ApiProperty({
    example: 'abc123',
    description: 'Permission identifier',
    readOnly: true,
  })
  permissionId: string;
  @ApiProperty({
    example: 'abc123',
    description: 'Resource identifier',
    readOnly: true,
  })
  resourceId: string;
  @ApiProperty({
    example: 'Super usuario',
    description: 'Permission name',
    readOnly: true,
  })
  name: string;
  @ApiProperty({
    example: 'http://proyecto.complexivo.com/student/ver-empresa',
    description: 'Endpoint name',
    readOnly: true,
  })
  createdAt: Date;
  updatedAt: Date;
  state: boolean;
}
