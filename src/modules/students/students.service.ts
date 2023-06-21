
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import * as XLSX from 'xlsx';
import { CreateStudentsDto } from './dto/create-students.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { StatusStudent } from '@prisma/client';
import { StudentEntity } from './entities/student.entity';
@Injectable()
export class StudentsService {
  constructor(private _prismaService: PrismaService) {}

 
  async uploadStudents(file: Express.Multer.File) {
    let newStudentsExcel = [];
    const listDni = [];
    if (!file) throw new UnprocessableEntityException('No file uploaded');
    const workBook = XLSX.read(file.buffer, {
      type: 'buffer',
      cellDates: true,
      cellNF: false,
    });
    const workSheet = workBook.Sheets[workBook.SheetNames[0]];
    const students = XLSX.utils.sheet_to_json(workSheet);
    let newStudent = {
      dni: '',
      names: '',
      careerName: '',
      careerCode: '',
      periodAcademic: '',
      finalNotes: [],
      statusNotes: [],
    };
    let periodElective = '';
    students.forEach((student, index) => {
      if (!!student['__EMPTY_1']) {
        periodElective = student['__EMPTY_1'].toString();
      }
      if (!!student['__EMPTY_2']) {
        newStudent = {
          dni: student['__EMPTY_2'],
          names: student['__EMPTY_3'],
          careerName: student['__EMPTY_4'],
          careerCode: student['__EMPTY_5'],
          periodAcademic: student['__EMPTY_6'],
          finalNotes: [],
          statusNotes: [],
        };
        newStudent.finalNotes.push(student['__EMPTY_14']);
        newStudent.statusNotes.push(student['__EMPTY_15']);
      }
      if (newStudent.dni !== student['__EMPTY_2']) {
        newStudent.finalNotes.push(student['__EMPTY_14']);
        newStudent.statusNotes.push(student['__EMPTY_15']);
      }

      if (!listDni.includes(newStudent.dni)) {
        listDni.push(newStudent.dni);
        newStudentsExcel.push(newStudent);
      }
    });

    const newStudents: CreateStudentsDto[] = [];
    const studentsWithStatus = newStudentsExcel.filter((student) =>
      student.statusNotes.some((status: string) => status === 'APROBADO'),
    );
    studentsWithStatus.forEach((student) => {
      const newStudent: CreateStudentsDto = {
        dni: student.dni,
        firstName: student.names.split(' ')[2],
        secondName: student.names.split(' ')[3],
        lastName: student.names.split(' ')[0],
        secondLastName: student.names.split(' ')[1],
        electivePeriod: periodElective,
        academicPeriod: student.periodAcademic,
        email: '@yavirac.edu.ec',
        password: this.hashPassword(student.dni),
        idCareer: 1,
        status: student.statusNotes.every(
          (status: string) => status === 'APROBADO',
        )
          ? StatusStudent.ACTIVO
          : StatusStudent.PERDIDO,
        state: true,
      };
      newStudent.email = `${newStudent.firstName
        ?.toLowerCase()
        .charAt(0)}${newStudent.secondName
        ?.toLowerCase()
        .charAt(0)}${newStudent.secondLastName
        ?.toLowerCase()
        .charAt(0)}.${newStudent.lastName.toLowerCase()}@yavirac.edu.ec`;
      newStudents.push(newStudent);
    });

    const studentsDB = await this._prismaService.student.findMany({
      where: {
        state: true,
      },
    });

    const onlyNewsStudents = newStudents.filter(
      (student) =>
        !studentsDB.some((studentDB) => studentDB.dni === student.dni),
    );
    const existingStudents = newStudents.filter((student) =>
      studentsDB.some((studentDB) => studentDB.dni === student.dni),
    );
    if (onlyNewsStudents.length > 0) {
      await this._prismaService.student.createMany({
        data: onlyNewsStudents,
      });
    }
    existingStudents.forEach(async (student) => {
      const studentDB = studentsDB.find(
        (studentDB) => studentDB.dni === student.dni,
      );
      const studentData = {
        ...studentDB,
        status: student.status,
        academicPeriod: student.academicPeriod,
        electivePeriod: student.electivePeriod,
      };
      await this._prismaService.student.update({
        where: {
          id: studentData.id,
        },
        data: studentData,
      });
    });

    return await this._prismaService.student.findMany({
      where: {
        state: true,
      },
      include: {
        career: true,
      },
      orderBy: {
        lastName: 'asc',
      },
    });
  }

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

  hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }
}
