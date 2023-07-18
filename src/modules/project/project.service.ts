import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectEntity } from './entities/project.entity';
import { StudentsService } from '../students/students.service';
import { Prisma } from '@prisma/client';
import { TutorService } from '../tutor/tutor.service';
import { PaginationOptions } from 'src/core/models/paginationOptions';
import { PaginationResult } from 'src/core/models/paginationResult';
import { ProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectService {

  constructor(
    private _prismaService: PrismaService,
    private _studentService: StudentsService,
    private _tutorService: TutorService

  ) { }
  async create(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    try {
      const project = await this._prismaService.project.create({
        data: {
          name: createProjectDto.name,
          description: createProjectDto.description,
          status: createProjectDto.status,
          idBusinessTutor: createProjectDto.idBusinessTutor,
          idCompany: createProjectDto.idCompany,
        },
      });
      return project;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findAll(
    idCompany: number,
    options: PaginationOptions,
    allActive?: boolean
  ): Promise<PaginationResult<ProjectDto>> {

    const { page, limit } = options;

    const hasFilter = !!options.name || !!options.company || !!options.tutorAcademic || !!options.tutorBusiness;

    try {
      const projects = await this._prismaService.project.findMany({
        where: {
          state: allActive ? true : undefined,
          idCompany: idCompany,
          name: hasFilter ? { contains: options.name } : undefined,
          company: hasFilter ? { name: { contains: options.company } } : undefined,
          academicTutor: hasFilter ? { firstName: { contains: options.tutorAcademic, mode: Prisma.QueryMode.insensitive }, lastName: { contains: options.tutorAcademic, mode: Prisma.QueryMode.insensitive } } : undefined,
          businessTutor: hasFilter ? { firstName: { contains: options.tutorBusiness, mode: Prisma.QueryMode.insensitive }, lastName: { contains: options.tutorBusiness, mode: Prisma.QueryMode.insensitive } } : undefined,
        },
        include: {
          company: true,
          academicTutor: true,
          businessTutor: true,
        },
        orderBy: {
          createdAt: Prisma.SortOrder.desc,
        },
        take: hasFilter ? undefined : limit,
        skip: hasFilter ? undefined : page,
      });

      if (!projects || projects.length === 0) {
        throw new HttpException('No hay proyectos', HttpStatus.NOT_FOUND);
      }

      return {
        results: projects.map((project) => {
          return {
            id: project.id,
            name: project.name,
            description: project.description,
            status: project.status,
            idCompany: project.idCompany,
            company: project.company.name,
            idAcademicTutor: project.idAcademicTutor,
            academicTutor: `${project.academicTutor.firstName} ${project.academicTutor.lastName}`,
            idBusinessTutor: project.idBusinessTutor,
            businessTutor: `${project.businessTutor.firstName} ${project.businessTutor.lastName}`,
          };
        }),
        page: page,
        limit: limit,
        total: await this._prismaService.project.count({
          where: {
            state: allActive ? true : undefined,
          }
        }),
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

  }


  async assignAcademicTutor(idProject: number, idAcademicTutor: number): Promise<ProjectEntity> {
    const project = await this.findOne(idProject);
    if (!project) {
      throw new HttpException('El proyecto no existe', HttpStatus.NOT_FOUND);
    }
    const academicTutor = await this._tutorService.findOne(idAcademicTutor);
    if (!academicTutor) {
      throw new HttpException('El tutor academico no existe', HttpStatus.NOT_FOUND);
    }
    try {
      return await this._prismaService.project.update({
        where: {
          id: idProject,
        },
        data: {
          idAcademicTutor: idAcademicTutor,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async assignBusinessTutor(idProject: number, idBusinessTutor: number): Promise<ProjectEntity> {
    const project = await this.findOne(idProject);
    if (!project) {
      throw new HttpException('El proyecto no existe', HttpStatus.NOT_FOUND);
    }
    const businessTutor = await this._tutorService.findOne(idBusinessTutor);
    if (!businessTutor) {
      throw new HttpException('El tutor empresarial no existe', HttpStatus.NOT_FOUND);
    }
    try {
      return await this._prismaService.project.update({
        where: {
          id: idProject,
        },
        data: {
          idBusinessTutor: idBusinessTutor,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async assignStudent(idProject: number, idStudent: number): Promise<ProjectEntity> {
    const project = await this.findOne(idProject);
    if (!project) {
      throw new HttpException('El proyecto no existe', HttpStatus.NOT_FOUND);
    }
    await this._studentService.assignToProject({ idStudent: idStudent, idProject: idProject });
    return await this.findOne(idProject);
  }

  async findOne(id: number): Promise<ProjectEntity> {
    try {
      const project = await this._prismaService.project.findUnique({
        where: {
          id: id,
        },
      });
      if (!project) {
        throw new HttpException(
          'El proyecto no existe',
          HttpStatus.NOT_FOUND,
        );
      }
      return project;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<ProjectEntity> {

    const projectExists = await this.findOne(id);
    if (!projectExists) {
      throw new HttpException('El proyecto no existe', HttpStatus.NOT_FOUND);
    }
    try {
      return await this._prismaService.project.update({
        where: {
          id: id,
        },
        data: updateProjectDto,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async remove(id: number): Promise<HttpException> {
    try {
      const project = this.findOne(id);
      if (!project) {
        throw new HttpException('El proyecto no existe', HttpStatus.NOT_FOUND);
      }
      await this._prismaService.project.update({
        where: {
          id: id,
        },
        data: {
          state: false,
        },
      });
      return new HttpException('Proyecto eliminado', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
