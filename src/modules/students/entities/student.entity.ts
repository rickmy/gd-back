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
  status: StatusStudent;
  idCareer: number;
  career?: CareerEntity;
  idUser: string;
  user?: UserEntity;
}
