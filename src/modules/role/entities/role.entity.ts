import { Rol } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';

export class RoleEntity implements Rol {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'ROL-001' })
  rolId: string;
  @ApiProperty({ example: '123456789', description: 'Rol name' })
  name: string;
  @ApiProperty({ example: 'EST', description: 'Rol code' })
  code: string;
  @ApiProperty({
    example: '2200/21/12',
    description: 'Creation date',
    readOnly: true,
  })
  createdAt: Date;
  @ApiProperty({
    example: '2200/21/12',
    description: 'Update date',
    readOnly: true,
  })
  updatedAt: Date;
  @ApiProperty({ example: true, description: 'State of the rol' })
  state: boolean;
}
