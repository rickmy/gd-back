import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString({ message: 'El nombre debe ser un string' })
  @IsNotEmpty({ message: 'El nombre del permiso es requerido.' })
  @ApiProperty({ description: 'name', example: 'Super Usuario' })
  name: string;
  @IsString({ message: 'El end point debe ser un string' })
  @IsNotEmpty({ message: 'El end point es requerido.' })
  @ApiProperty({
    description: 'id del recurso',
    example: 'sdfsdfsd',
  })
  resourceId: string;
}
