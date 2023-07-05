import { ApiProperty } from "@nestjs/swagger";
import { StatusCompany, StatusProject } from "@prisma/client";

export class CompaniesInfoDto {
    @ApiProperty({ example: '123412341234', description: 'Ruc empresa' })
    ruc: string;
    @ApiProperty({ example: 'Yavi EC', description: 'Nombre empresa' })
    name: string;
    @ApiProperty({ example: 'Av. 5 de Julio y moran valverde', description: 'Direccion empresa' })
    adress: string; 
    status: StatusCompany;
    @ApiProperty({ example: 'True', description: 'Estado empresa' })
    state: boolean;

    @ApiProperty({ example: '1726345645', description: 'Dni representante legal' })
    dniRepresentLegal: string;
    @ApiProperty({ example: 'Juan Rios', description: 'Nombre representante legal' })
    nameRepresentLegal: string;
    @ApiProperty({ example: 'yav.ec@yavirac.edu.ec', description: 'Email representante legal' })
    emailRepresentLegal: string;
    @ApiProperty({ example: '091548957', description: 'Número representante legal' })
    phoneRepresentLegal: string;
    
    @ApiProperty({ example: 'FHGVF45D', description: 'Código convenio' })
    agreementCode: string;
    @ApiProperty({ example: '2023/07/20', description: 'Fecha inicio convenio' })
    agreementDateStart: Date;
    @ApiProperty({ example: '2023/07/20', description: 'Fecha final convenio' })
    agreementDateEnd: Date;
    @ApiProperty({ example: 'True', description: 'Estado convenio' })
    agreementStatus: StatusProject;
    agreementState: boolean;
    

    @ApiProperty({ example: 'Yavi Ec', description: 'Nombre proyecto' })
    projectName: string;
    @ApiProperty({ example: 'Este es un proyecto de asignacion de estudiantes a empresas', description: 'Descripcion del proyecto' })
    projectDescription: string;
    @ApiProperty({ example: 'True', description: 'Status del proyecto' })
    projectStatus: StatusProject;
    projectState: boolean;

}