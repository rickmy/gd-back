import { ApiProperty } from "@nestjs/swagger";
import { StatusProject } from "@prisma/client";

export class CompaniesAgreements {
    @ApiProperty({ example: 1, description: 'Identificador', type: 'number' })
    id: number;
    @ApiProperty({ example: 'FHGVF45D', description: 'Código convenio' })
    code: string;
    @ApiProperty({ example: '2023/07/20', description: 'Fecha inicio convenio' })
    dateStart: Date;
    @ApiProperty({ example: '2023/07/20', description: 'Fecha final convenio' })
    dateEnd: Date;
    @ApiProperty({ example: 'True', description: 'Estado convenio' })
    status: StatusProject;
}