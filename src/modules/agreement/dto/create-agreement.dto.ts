import { ApiProperty } from "@nestjs/swagger";
import { StatusProject } from "@prisma/client";

export class CreateAgreementDto {
    @ApiProperty({ example: '45BCD', description: 'Código convenio' })
    code: string;
    @ApiProperty({ example: '453564356487', description: 'Ruc compañía' })
    dateStart: Date;
    dateEnd: Date;
    documents: string;
    state: boolean;
    status: StatusProject;
    idCompany: number;
}
