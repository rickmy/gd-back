import { ApiProperty } from "@nestjs/swagger";

export class StudentDto {
  @ApiProperty({ example: 1, description: 'id del estudiante' })
  id: number;
  @ApiProperty({ example: '1727373644', description: 'dni del estudiante' })
  dni: string;
  @ApiProperty({ example: 'Hector Gonzales', description: 'Nombres Completos' })
  completeNames: string;
  @ApiProperty({ example: 'Desarrollo de software', description: 'Nombre de la carrera' })
  career: string;
  @ApiProperty({ example: 'A', description: 'Paralelo' })
  parallel: string;
  @ApiProperty({ example: 'r@yavirac.edu.ec', description: 'Correo electronico' })
  email: string;
  @ApiProperty({ example: '2022-1P', description: 'Periodo electivo' })
  electivePeriod: string;
  @ApiProperty({ example: 'TERCERO', description: 'Periodo academico' })
  academicPeriod: string;
  @ApiProperty({ example: 'APROBADO', description: 'Estado del estudiante' })
  status: string;
  @ApiProperty({ example: 'Yavirac', description: 'Empresa' })
  company: string;
  @ApiProperty({ example: 'Desarrollo de software', description: 'Proyecto' })
  project: string;
  @ApiProperty({ example: 'Hector Gonzales', description: 'Tutor academico' })
  academicTutor: string;
  @ApiProperty({ example: 'Hector Gonzales', description: 'Tutor empresarial' })
  businessTutor: string;
}