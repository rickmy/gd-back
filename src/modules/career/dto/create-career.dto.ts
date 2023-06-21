import { ApiProperty } from '@nestjs/swagger';
import { UserByCareerDto } from './user-by-career.dto';

export class CreateCareerDto {
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
    type: UserByCareerDto,
    description: 'Coordinador de la carrera',
  })
  coordinator: UserByCareerDto;
  @ApiProperty({
    type: UserByCareerDto,
    description: 'Vicecoordinador de la carrera',
  })
  viceCoordinator: UserByCareerDto;
  @ApiProperty({
    type: UserByCareerDto,
    description: 'Responsable de practicas de la carrera',
  })
  respStepDual: UserByCareerDto;
}
