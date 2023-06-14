import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class ResponseAuthModel {
  @ApiProperty({
    description: 'Token de acceso',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  })
  accessToken: string;
  @ApiProperty({
    description: 'Datos del usuario',
    type: UserEntity,
    example: {
      id: 1,
      name: 'Ricardo',
      lastName: 'Ramírez',
    },
  })
  user: UserEntity;
}
