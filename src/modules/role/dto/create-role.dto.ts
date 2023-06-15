import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { PermissionEntity } from 'src/modules/permissions/entities/permission.entity';

export class CreateRoleDto {
  @IsString({ message: 'el rol debe ser un string' })
  @IsNotEmpty({ message: 'el rol no debe estar vacio' })
  @ApiProperty({ description: 'nombre del rol', example: 'admin' })
  name: string;
  @ApiProperty({
    description: 'permisos del rol',
    example: [{ id: 1, name: 'create' }],
    isArray: true,
  })
  permissions: PermissionEntity[];
}
