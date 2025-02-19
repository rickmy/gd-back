import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsNumber } from 'class-validator';

export class UserEntity implements User {
  @ApiProperty({ example: 1, description: 'Identificador', type: 'number' })
  @IsNumber()
  id: number;
  @ApiProperty({ example: '12345678', description: 'user Id', type: 'string' })
  userId: string;
  @ApiProperty({ example: '12345678', description: 'DNI', type: 'string' })
  dni: string;
  @ApiProperty({ example: 'Hector', description: 'Student first name' })
  name: string;
  @ApiProperty({
    example: 'Hugo',
    description: 'Student second name',
    readOnly: true,
  })
  secondName: string;
  @ApiProperty({
    example: 'Ruiz',
    description: 'Student last name',
    readOnly: true,
  })
  lastName: string;
  @ApiProperty({
    example: 'Sánchez',
    description: 'Student secont last name',
    readOnly: true,
  })
  secondLastName: string;
  @ApiProperty({
    example: 'Hugo Ruiz',
    description: 'Student complete name',
    readOnly: true,
  })
  completeName: string;
  @ApiProperty({
    example: 'example@example.com',
    description: 'Correo',
    type: 'string',
  })
  email: string;
  @ApiProperty({
    example: '0987654321',
    description: 'Teléfono',
    type: 'string',
  })
  phone: string;
  @ApiProperty({ example: '', description: 'Contraseña', type: 'string' })
  password: string;
  @ApiProperty({ example: '', description: 'Salt', type: 'string' })
  salt: string;
  @ApiProperty({
    example: '2021-10-10T00:00:00.000Z',
    description: 'Fecha de creación',
    type: 'string',
  })
  createdAt: Date;
  @ApiProperty({
    example: '2021-10-10T00:00:00.000Z',
    description: 'Fecha de actualización',
    type: 'string',
  })
  updatedAt: Date;
  @ApiProperty({ example: true, description: 'Estado', type: 'boolean' })
  state: boolean;
  @ApiProperty({ example: 1, description: 'Rol', type: 'number' })
  rolId: string;
}
