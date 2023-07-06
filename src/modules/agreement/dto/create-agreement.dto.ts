import { ApiProperty } from "@nestjs/swagger";
import { StatusProject } from "@prisma/client";
import { IsEnum } from "class-validator";

export class CreateAgreementDto {
    @ApiProperty({ example: '45BCD', description: 'Código convenio' })
    code: string;
    @ApiProperty({ example: '2022-01-05', description: 'Fecha inicio convenio' })
    dateStart: Date;
    @ApiProperty({ example: '2022-01-05', description: 'Fecha fin convenio' })
    dateEnd: Date;
    documents: string;
    @IsEnum(StatusProject, { message: 'El status del convenio es inválido' })
    @ApiProperty({
      description: 'Status convenio',
      enum: StatusProject,
      default: StatusProject.ACTIVO,
    })
    status: StatusProject;
    @ApiProperty({ example: '1', description: 'ID del convenio' })
    idCompany: number;
}
