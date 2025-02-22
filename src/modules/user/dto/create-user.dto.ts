import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: '12345678',
    description: 'Cédula/Pasaporte',
    required: false,
    type: 'string',
  })
  @IsString({ message: 'el campo debe ser un string', always: false })
  @IsOptional()
  dni?: string;
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
    type: 'string',
  })
  @IsString({ message: 'el campo debe ser un string' })
  password: string;
  @ApiProperty({
    example: 'Hector Ruiz',
    description: 'Nombre completo',
    type: 'string',
  })
  completeName: string;
  @ApiProperty({
    example: '12345678',
    description: 'Salt',
    type: 'string',
  })
  salt: string;
  @ApiProperty({ example: '1', description: 'Rol' })
  rolId: string;
}
