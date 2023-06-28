import { ApiProperty } from "@nestjs/swagger";
import { StatusCompany } from "@prisma/client";

export class CompaniesDto {
    @ApiProperty({ example: '453564356487', description: 'Ruc compañía' })
    ruc: string;
    @ApiProperty({ example: 'Yavirac EC', description: 'Nombre de la compañía' })
    name: string;
    @ApiProperty({ example: '1727373644', description: 'dni del representante legal' })
    dniRepresentLegal: string;
    @ApiProperty({ example: 'Alberto Gómez', description: 'nombre completo del representante legal' })
    representLegalCompleteNames: string;
    email: string;
    phone: string;
    addres: string;
    status: StatusCompany;

}