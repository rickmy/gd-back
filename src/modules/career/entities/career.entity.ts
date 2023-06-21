import { ApiProperty } from "@nestjs/swagger";
import { Career } from "@prisma/client";

export class CareerEntity implements Career {
  @ApiProperty({ type: Number, description: 'Id de la carrera'})
  id: number
  @ApiProperty({ type: String, description: 'Código de la carrera'})
  code: string
  @ApiProperty({ type: String, description: 'Nombre de la carrera'})
  name: string
  @ApiProperty({ type: Date, description: 'Fecha de inicio de la fase practica por carrera'})
  dateStart: Date
  @ApiProperty({ type: Date, description: 'Fecha de fin de la fase practica por carrera'})
  dateEnd: Date
  @ApiProperty({ type: Number, description: 'numero de semanas que se demora la renovacion del convenio por carrera'})
  timeRenovationAgreement: number
  @ApiProperty({ type: Date, description: 'Fecha de icreacion de la carrera'})
  createdAt: Date
  @ApiProperty({ type: Date, description: 'Fecha de actualizacion de la carrera'})
  updatedAt: Date
  @ApiProperty({ type: Boolean, description: 'Estado de la carrera'})
  state: boolean
  @ApiProperty({ type: String, description: 'Coordinador de la carrera'})
  coordinator: string
  @ApiProperty({ type: String, description: 'Vicecoordinador de la carrera'})
  viceCoordinator: string
  @ApiProperty({ type: String, description: 'Responsable de practicas de la carrera'})
  respStepDual: string
}
