import { StatusStudent } from '@prisma/client';

export class CreateStudentsDto {
  userDNI: string;
  idCareer: number;
  status: StatusStudent;
}
