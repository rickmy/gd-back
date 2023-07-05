import { ApiProperty } from "@nestjs/swagger";
import { StatusProject } from "@prisma/client";

export class CompaniesProjects {
    @ApiProperty({ example: 1, description: 'Identificador', type: 'number' })
    id: number;
    @ApiProperty({ example: 'Yavi Ec', description: 'Nombre proyecto' })
    name: string;
    @ApiProperty({ example: 'Este es un proyecto de asignacion de estudiantes a empresas', description: 'Descripcion del proyecto' })
    description: string;
    @ApiProperty({ example: 'True', description: 'Status del proyecto' })
    status: StatusProject;
   
}