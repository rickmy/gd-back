import { HttpException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { StudentEntity } from './entities/student.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class StudentsService {

  constructor( private prismaService: PrismaService) {}

   async create(createStudentDto: CreateStudentDto): Promise<StudentEntity> {
    const studentExists = await this.findStudentByDni(createStudentDto.dni);
    if (studentExists) {
      throw new HttpException('El estudiante ya existe', 400);
    }
    createStudentDto.password = bcrypt.hashSync(createStudentDto.dni, 10);
    
    return await this.prismaService.student.create({
      data: createStudentDto,
    });
  }

  async findAll(allActive?: boolean): Promise<StudentEntity[]> {
    try {
      return await this.prismaService.student.findMany({
        where: {
          state: allActive ? true : undefined,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.student.findFirstOrThrow({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, 404);
    }
    
  }

  async findStudentByDni(dni: string) {

      return await this.prismaService.student.findFirst({
        where: {
          dni,
        },
      });
    
  }

  async update(id: number, updateStudentDto: UpdateStudentDto):Promise<StudentEntity> {
    
    return await this.prismaService.student.update({
      where: {
        id: id,
      },
      data: updateStudentDto,
    });
  }

  async remove(id: number): Promise<HttpException> {
    try {
      await this.prismaService.student.update({
        where: {
          id,
        },
        data: {
          state: false,
        },
      });
      return new HttpException('Estudiante eliminado correctamente', 200);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
