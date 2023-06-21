import { ApiProperty } from '@nestjs/swagger';
import { TypeDNI, User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty({ example: 1, description: 'Identificador', type: 'number' })
  id: number;
  @ApiProperty({ example: '12345678', description: 'DNI', type: 'string' })
  dni: string;
  @ApiProperty({
    example: 'CEDULA',
    description: 'Tipo de DNI',
    enum: TypeDNI,
    type: 'string',
  })
  typeDni: TypeDNI;
  @ApiProperty({ example: 'Juan', description: 'Nombre', type: 'string' })
  firstName: string;
  @ApiProperty({ example: 'Perez', description: 'Apellido', type: 'string' })
  lastName: string;
  @ApiProperty({
    example: 'example@yavirac.edu.ec',
    description: 'Correo',
    type: 'string',
  })
  email: string;
  @ApiProperty({ example: '', description: 'Contraseña', type: 'string' })
  password: string;
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
  idRol: number;
}
