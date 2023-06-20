import { ApiProperty } from '@nestjs/swagger';
import { StatusStudent, Student, TypeDNI } from '@prisma/client';

export class StudentEntity implements Student {
  @ApiProperty({ example: 1, description: 'Student id' })
  id: number;
  @ApiProperty({ example: '1727373644', description: 'Student dni' })
  dni: string;
  typeDni: TypeDNI;
  status: StatusStudent;
  @ApiProperty({ example: 'Hector', description: 'Student first name' })
  firstName: string;
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
    example: '2022-2023',
    description: 'Student elective period',
    readOnly: true,
  })
  electivePeriod: string;
  @ApiProperty({
    example: '2023-1',
    description: 'Student academic period',
    readOnly: true,
  })
  academicPeriod: string;
  @ApiProperty({
    example: 'hts.ruiz@yavirac.edu.ec',
    description: 'Student email',
    readOnly: true,
  })
  email: string;
  @ApiProperty({
    example: 'passexample',
    description: 'Student password',
    readOnly: true,
  })
  password: string;
  createdAt: Date;
  updatedAt: Date;
  state: boolean;
  idCareer: number;
  idProject: number;
}
