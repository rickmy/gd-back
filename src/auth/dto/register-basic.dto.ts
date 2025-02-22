import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class RegisterBasicDto {
  @ApiProperty({
    example: 'hector.ruiz',
    description: 'Nombre de usuario',
    type: 'string',
  })
  @IsString({ message: 'el nombre de usuario debe ser un string' })
  name: string;
  @ApiProperty({
    example: 'ruiz',
    description: 'Apellido de usuario',
    type: 'string',
  })
  @IsString({ message: 'el apellido de usuario debe ser un string' })
  lastName: string;
  @ApiProperty({
    example: 'example@yavirac.edu.ec',
    description: 'Correo',
    type: 'string',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    example: '12345678',
    description: 'Contraseña',
  })
  @IsString({ message: 'el dni debe ser un string' })
  dni: string;
  @ApiProperty({ example: '1ewr', description: 'Rol' })
  @IsString({ message: 'El rol debe ser un string' })
  rolId: string;
}
