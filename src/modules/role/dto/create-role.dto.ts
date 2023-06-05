import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @IsString({ message: 'el rol debe ser un string' })
  @IsNotEmpty({ message: 'el rol no debe estar vacío' })
  @ApiProperty({ description: 'Nombre del rol', example: 'admin' })
  name: string;
}
