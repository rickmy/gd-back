import { StatusStudent } from '@prisma/client';

export class CreateStudentsDto {
  dni: string;
  firstName: string;
  secondName: string;
  lastName: string;
  secondLastName: string;
  electivePeriod: string;
  academicPeriod: string;
  email: string;
  password: string;
  idCareer: number;
  status: StatusStudent;
  state: boolean;
}
