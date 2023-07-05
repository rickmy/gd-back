import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectEntity } from './entities/project.entity';
import { StudentsService } from '../students/students.service';

@Injectable()
export class ProjectService {

  constructor(
    private _prismaService: PrismaService,
    private _studentService: StudentsService
    
    ) {}
  async create(createProjectDto: CreateProjectDto): Promise<ProjectEntity> {
    try {
      const project = await this._prismaService.project.create({
        data: {
          ...createProjectDto,
        },
      });
      return project;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findAll() {
    return `This action returns all project`;
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

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
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
