import { ApiProperty } from '@nestjs/swagger';
import { UserByCareerDto } from './user-by-career.dto';

export class CareerDto {
  @ApiProperty({ type: Number, description: 'Id de la carrera' })
  id: number;
  @ApiProperty({ type: String, description: 'Código de la carrera' })
  code: string;
  @ApiProperty({ type: String, description: 'Nombre de la carrera' })
  name: string;
  @ApiProperty({
    type: Date,
    description: 'Fecha de inicio de la fase practica por carrera',
  })
  dateStart: Date;
  @ApiProperty({
    type: Date,
    description: 'Fecha de fin de la fase practica por carrera',
  })
  dateEnd: Date;
  @ApiProperty({
    type: Number,
    description:
      'numero de semanas que se demora la renovacion del convenio por carrera',
  })
  timeRenovationAgreement: number;
  @ApiProperty({
    type: Number,
    description: 'Coordinador de la carrera',
  })
  idCoordinator: number;
  @ApiProperty({
    type: Number,
    description: 'Vicecoordinador de la carrera',
  })
  idViceCoordinator: number;
  @ApiProperty({
    type: Number,
    description: 'Responsable de practicas de la carrera',
  })
  idRespStepDual: number;
}
