import { Agreement, StatusProject } from "@prisma/client";

export class AgreementEntity implements Agreement {
    id: number;
    code: string;
    dateStart: Date;
    dateEnd: Date;
    documents: string;
    createdAt: Date;
    updatedAt: Date;
    state: boolean;
    status: StatusProject;
    idCompany: number;

}
