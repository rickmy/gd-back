import { ApiProperty } from '@nestjs/swagger';
import { StatusStudent, Student, TypeDNI } from '@prisma/client';
import { CareerEntity } from 'src/modules/career/entities/career.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class StudentEntity implements Student {
  @ApiProperty({ example: 1, description: 'Student id' })
  id: number
  typeDni: TypeDNI
  dni: string
  firstName: string
  secondName: string | null
  lastName: string
  secondLastName: string | null
  email: string
  idUser: number
  createdAt: Date
  updatedAt: Date
  state: boolean
  status: StatusStudent
  idCareer: number
}
