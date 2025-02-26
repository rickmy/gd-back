import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString({ message: 'la acción debe ser un string' })
  @IsNotEmpty({ message: 'La acción es requerida.' })
  @ApiProperty({ description: 'action', example: 'create' })
  actionId: string;
  @IsString({ message: 'el recurso debe ser un string' })
  @IsNotEmpty({ message: 'El recurso es requerido.' })
  @ApiProperty({
    description: 'id del recurso',
    example: 'sdfsdfsd',
  })
  resourceId: string;
}
