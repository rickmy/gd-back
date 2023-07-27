import { TutorDto } from "src/modules/tutor/dto/tutor.dto";
import { StudentProjectDto } from "src/modules/students/dto/student-project.dto";
import { ApiProperty } from "@nestjs/swagger";
import { isArray } from "class-validator";

export class ReportCompanyDto{

    @ApiProperty({ example: '1', description: 'Id Compañia' })
    id: number;
    @ApiProperty({ example: 'Yavi Soft', description: 'Nombre de Empresa' })
    company: string;
    @ApiProperty({ example: TutorDto, description: 'Tutor academico' })
    academicTutor: TutorDto;
    @ApiProperty({ example: TutorDto, description: 'Tutor empresarial' })
    businessTutor: TutorDto;
    @ApiProperty({ example: [StudentProjectDto], description: 'Estudiantes' })
    students: StudentProjectDto[];
}