import { Project, StatusCompany } from "@prisma/client";

export class CreateCompanyDto {

    ruc: string;
    name: string;
    dniRepresentLegal: string;
    nameRepresentLegal: string;
    lastNameRepresentLegal: string;
    phone: string;
    address: string;
    status: StatusCompany;
    idCarrer: number;

}
