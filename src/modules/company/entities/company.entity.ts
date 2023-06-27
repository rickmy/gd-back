import { ApiProperty } from "@nestjs/swagger";
import { Career, Company, StatusCompany } from "@prisma/client";
import { CareerEntity } from "src/modules/career/entities/career.entity";
import { UserEntity } from "src/modules/user/entities/user.entity";

export class CompanyEntity implements Company {
    @ApiProperty({ example: 1, description: 'Company id' })
    id: number;
    @ApiProperty({ example: '2354235357', description: 'Ruc compañia' })
    ruc: string;
    @ApiProperty({ example: 'Yavirac EC', description: 'Nombre compañia' })
    name: string;
    @ApiProperty({ example: '2354235357', description: 'Dni representante legal' })
    dniRepresentLegal: string;
    @ApiProperty({ example: 'Alberto', description: 'Nombre representante legal' })
    nameRepresentLegal: string;
    @ApiProperty({ example: 'Ríos', description: 'Apellido representante legal' })
    lastNameRepresentLegal: string;
    @ApiProperty({ example: '0983656375', description: 'Número compañía' })
    phone: string;
    @ApiProperty({ example: 'Av. Mariscal Sucre y Venezuela E435', description: 'Dirección compañía' })
    address: string;
    createdAt: Date;
    updatedAt: Date;
    state: boolean;
    @ApiProperty({ example: 'PENDIENTE', description: 'Status Compañía' })
    status: StatusCompany;
    @ApiProperty({ example: 1, description: 'ID carrera' })
    idCareer: number;
    career?: CareerEntity;
    @ApiProperty({ example: '1', description: 'ID Usuario' })
    idUser: string;
    user?: UserEntity;

    
}
