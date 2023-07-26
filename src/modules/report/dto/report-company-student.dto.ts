import { ReportProjectStudentDto } from "./report-student-project.dto";

export class ReportCompanyStudentDto {

    id: number;
    dni: string;
    firstName: string;
    secondName: string;
    lastName: string;
    secondLastName: string;
    electivePeriod:string;
    project: ReportProjectStudentDto;


}