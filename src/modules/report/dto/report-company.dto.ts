import { TutorDto } from "src/modules/tutor/dto/tutor.dto";
import { ReportCompanyStudentDto } from "./report-company-student.dto";
import { ReportProjectTutorDto } from "./report-project-tutor.dto";

export class ReportCompanyDto{
    id: number;
    company: string;
    academicTutor: TutorDto;
    businessTutor: TutorDto;
    students: ReportCompanyStudentDto[];
}