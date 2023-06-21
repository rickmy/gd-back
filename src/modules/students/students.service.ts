import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { StudentEntity } from './entities/student.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentsService {

  constructor( private _prismaService: PrismaService) {}

   async create(createStudentDto: CreateStudentDto): Promise<StudentEntity> {
    const studentExists = await this.findStudentByDni(createStudentDto.dni);
    if (studentExists) {
      throw new HttpException('El estudiante ya existe', HttpStatus.CONFLICT);
    }
    createStudentDto.password = bcrypt.hashSync(createStudentDto.dni, 10);
    try {
      return await this._prismaService.student.create({
        data: createStudentDto,
      });
    } catch (error) {
      throw new HttpException('Error al crear el estudiante', HttpStatus.UNPROCESSABLE_ENTITY);
    }
   
  }

  async findAll(allActive?: boolean): Promise<StudentEntity[]> {
    try {
      return await this._prismaService.student.findMany({
        where: {
          state: allActive ? true : undefined,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findOne(id: number) {
    try {
      return await this._prismaService.student.findFirstOrThrow({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
    
  }

  async findStudentByDni(dni: string) {

      
      return await this._prismaService.student.findFirst({
        where: {
          dni,
        },
      });
    
  }

  async update(id: number, updateStudentDto: UpdateStudentDto):Promise<StudentEntity> {
      
      const studentExists = await this.findOne(id);
      if (!studentExists) {
        throw new HttpException('El estudiante no existe', HttpStatus.NOT_FOUND);
      }
    try{
      return await this._prismaService.student.update({
        where: {
          id: id,
        },
        data: updateStudentDto,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async remove(id: number): Promise<HttpException> {
    try {
      await this._prismaService.student.update({
        where: {
          id,
        },
        data: {
          state: false,
        },
      });
      return new HttpException('Estudiante eliminado correctamente', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
