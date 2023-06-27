import { ApiProperty } from '@nestjs/swagger';
import { StatusStudent, Student, TypeDNI } from '@prisma/client';
import { CareerEntity } from 'src/modules/career/entities/career.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class StudentEntity implements Student {
  @ApiProperty({ example: 1, description: 'Student id' })
  id: number;
  createdAt: Date;
  updatedAt: Date;
  state: boolean;
  @ApiProperty({ example: 'Pendiente', description: 'Status student' })
  status: StatusStudent;
  @ApiProperty({ example: 1, description: 'Career Id' })
  idCareer: number;
  career?: CareerEntity;
  @ApiProperty({ example: 1, description: 'User Id' })
  idUser: string;
  user?: UserEntity;
}
