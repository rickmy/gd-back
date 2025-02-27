import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: 'codigo del rol', example: 'admin' })
  @IsNotEmpty({ message: 'el codigo no debe estar vacio' })
  @IsString({ message: 'el codigo debe ser un string' })
  code: string;
  @IsString({ message: 'el rol debe ser un string' })
  @IsNotEmpty({ message: 'el rol no debe estar vacio' })
  @ApiProperty({ description: 'nombre del rol', example: 'admin' })
  name: string;
  @ApiProperty({
    description: 'permisos del rol',
    example: ['uuid'],
    isArray: true,
  })
  @IsString({ message: 'los permisos deben ser un string', each: true })
  permissions: string[];
}
