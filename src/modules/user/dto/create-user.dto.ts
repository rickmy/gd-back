import { ApiProperty } from '@nestjs/swagger';
import { TypeDNI } from '@prisma/client';
import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: '12345678', description: 'DNI', type: 'string'})
  @IsString({message: 'el campo debe ser un string'})
  dni: string;
  @ApiProperty({ example: 'CEDULA', description: 'Tipo de DNI', enum: TypeDNI, type: 'string'})
  @IsEnum(TypeDNI, {message: 'el campo debe ser un string'})
  typeDni: TypeDNI;
  @ApiProperty({ example: 'Juan', description: 'Nombre', type: 'string'})
  @IsString({message: 'el campo debe ser un string'})
  firstName: string;
  @ApiProperty({ example: 'Perez', description: 'Apellido', type: 'string'})
  @IsString({message: 'el campo debe ser un string'})
  lastName: string;
  @ApiProperty({ example: 'example@yavirac.edu.ec', description: 'Correo', type: 'string'})
  @IsEmail()
  email: string;
  @ApiProperty({ example: '12345678', description: 'Contraseña', type: 'string'})
  @IsString({message: 'el campo debe ser un string'})
  password: string;
  @ApiProperty({ example: '1', description: 'Rol', type: 'number'})
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 0 }, { message: 'El rol debe ser un número'})
  idRol: number;
}
