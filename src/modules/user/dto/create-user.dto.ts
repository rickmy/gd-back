import { ApiProperty } from '@nestjs/swagger';
import { TypeDNI } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: '12345678', description: 'DNI', type: 'string' })
  @IsString({ message: 'el campo debe ser un string' })
  dni: string;
  @ApiProperty({
    example: 'CEDULA',
    description: 'Tipo de DNI',
    enum: TypeDNI,
    type: 'string',
  })
  @IsOptional()
  typeDni: TypeDNI;
  @ApiProperty({
    example: 'hector.ruiz',
    description: 'Nombre de usuario',
    type: 'string',
  })
  @IsString({ message: 'el nombre de usuario debe ser un string' })
  userName: string;
  @ApiProperty({ example: 'Juan', description: 'Nombre', type: 'string' })
  @IsString({ message: 'el campo debe ser un string' })
  firstName: string;
  @ApiProperty({
    example: 'Pablo',
    description: 'Segundo Nombre',
    type: 'string',
  })
  @IsOptional()
  secondName: string;
  @ApiProperty({ example: 'Perez', description: 'Apellido', type: 'string' })
  @IsString({ message: 'el campo debe ser un string' })
  lastName: string;
  @ApiProperty({
    example: 'Garcia',
    description: 'Segundo Apellido',
    type: 'string',
  })
  @IsString({ message: 'el segundo nombre debe ser un string' })
  @IsOptional({ message: 'el segundo nombre puede estar vacio' })
  secondLastName: string;
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
  @ApiProperty({ example: '1', description: 'Rol', type: 'number' })
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 },
    { message: 'El rol debe ser un número' },
  )
  idRol: number;
}
