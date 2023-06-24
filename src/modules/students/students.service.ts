import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import * as XLSX from 'xlsx';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { StatusStudent, TypeDNI } from '@prisma/client';
import { StudentEntity } from './entities/student.entity';
import { PaginationOptions } from 'src/core/models/paginationOptions';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';
import { CareerService } from '../career/career.service';
import { CreateStudentsDto } from './dto/create-students.dto';
import { CreateStudentAssignedToCompanyDto } from './dto/create-student-assigned-to-company.dto';
@Injectable()
export class StudentsService {
  constructor(
    private _prismaService: PrismaService,
    private _userService: UserService,
    private _roleService: RoleService,
    private _careerService: CareerService,
  ) { }

  async uploadStudents(file: Express.Multer.File): Promise<HttpException> {
    let newStudentsExcel: {
      dni: string,
      names: string,
      careerName: string,
      careerCode: string,
      periodAcademic: string,
      parallel: string,
      finalNotes: number[],
      statusNotes: string[],
    }[] = [];
    const role = await this._roleService.findRoleByName('EST');
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
      parallel: '',
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
          parallel: student['__EMPTY_8'],
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

    const newUsers: CreateUserDto[] = [];
    const studentsWithStatus = newStudentsExcel.filter((student) =>
      student.statusNotes.some((status: string) => status === 'APROBADO'),
    );
    studentsWithStatus.forEach(async (student) => {
      const newUser: CreateUserDto = {
        dni: student.dni,
        firstName: student.names.split(' ')[2],
        secondName: student.names.split(' ')[3],
        lastName: student.names.split(' ')[0],
        secondLastName: student.names.split(' ')[1],
        email: '',
        password: this.hashPassword(student.dni),
        userName: student.dni,
        idRol: role.id,
        typeDni: TypeDNI.CEDULA,
      };
      newUser.email = `${newUser.firstName
        ?.toLowerCase()
        .charAt(0)}${newUser.secondName
          ?.toLowerCase()
          .charAt(0)}${newUser.secondLastName
            ?.toLowerCase()
            .charAt(0)}.${newUser.lastName.toLowerCase()}@yavirac.edu.ec`;
      newUsers.push(newUser);
    });

    const usersDB = await this._userService.findAll(null, role.id);

    const onlyNewsUser = newUsers.filter(
      (user) => !usersDB.some((userDB) => userDB.dni === user.dni),
    );

    const existingUsers = newUsers.filter((user) =>
      usersDB.some((userDB) => userDB.dni === user.dni && userDB.state === true && userDB.email === user.email),
    );

    if (onlyNewsUser.length > 0) {
      await this._prismaService.user.createMany({
        data: onlyNewsUser,
      });
      const usersDB = await this._prismaService.user.findMany({
        where: {
          dni: { in: onlyNewsUser.map((user) => user.dni) },
        },
      });
      usersDB.forEach(async (user) => {
        const student = newStudentsExcel.find(
          (student) => student.dni === user.dni
        );
        const career = await this._careerService.findByCode(student.careerCode);
        await this._prismaService.student.create({
          data: {
            idUser: user.dni,
            idCareer: career.id,
            status: student.statusNotes.every(
              (status: string) => status === 'APROBADO'
            ) ? StatusStudent.APROBADO : StatusStudent.REPROBADO,
          },
        });
      });

      const newStudentsDB = await this._prismaService.student.findMany({
        where: {
          idUser: { in: usersDB.map((user) => user.dni) },
        },
      });

      const studentHasCompany: CreateStudentAssignedToCompanyDto[] = newStudentsDB.map((student) => {
        return {
          idStudent: student.idUser,
          idCompany: null,
          electivePeriod: periodElective,
          academicPeriod: newStudentsExcel.find((studentExcel) => studentExcel.dni === student.idUser).periodAcademic,
          idProject: null,
          parallel: newStudentsExcel.find((studentExcel) => studentExcel.dni === student.idUser).parallel,
        };
      });

      await this._prismaService.studentAssignedToCompany.createMany({
        data: studentHasCompany,
      });
    }

    const studentsDB = await this._prismaService.student.findMany({
      where: {
        idUser: { in: existingUsers.map((user) => user.dni) },
      },
    });


    if (studentsDB.length === 0) {
      existingUsers.forEach(async (user) => {
        const student = newStudentsExcel.find(
          (student) => student.dni === user.dni
        );
        const career = await this._careerService.findByCode(student.careerCode);
        await this._prismaService.student.create({
          data: {
            idUser: user.dni,
            idCareer: career.id,
            status: student.statusNotes.every(
              (status: string) => status === 'APROBADO'
            ) ? StatusStudent.APROBADO : StatusStudent.REPROBADO,
          },
        });
      });

      const newStudentsDB = await this._prismaService.student.findMany({
        where: {
          idUser: { in: existingUsers.map((user) => user.dni) },
        },
      });

      const studentHasCompany: CreateStudentAssignedToCompanyDto[] = newStudentsDB.map((student) => {
        return {
          idStudent: student.idUser,
          idCompany: null,
          electivePeriod: periodElective,
          academicPeriod: newStudentsExcel.find((studentExcel) => studentExcel.dni === student.idUser).periodAcademic,
          idProject: null,
          parallel: newStudentsExcel.find((studentExcel) => studentExcel.dni === student.idUser).parallel,
        };
      });

      await this._prismaService.studentAssignedToCompany.createMany({
        data: studentHasCompany,
      });
    }

    studentsDB.forEach(async (studentDB) => {
      const student = newStudentsExcel.find(
        (student) => student.dni === studentDB.idUser
      );
      try {
        await this._prismaService.student.update({
          where: {
            idUser: studentDB.idUser,
          },
          data: {
            status: student.statusNotes.every(
              (status: string) => status === 'APROBADO'
            ) ? StatusStudent.APROBADO : StatusStudent.REPROBADO,
          },
        });

      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }

      try {
        await this._prismaService.studentAssignedToCompany.updateMany({
          where: {
            idStudent: studentDB.idUser,
          },
          data: {
            state: false,
          },
        });


      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      
      try {

        await this._prismaService.studentAssignedToCompany.create({
          data: {
            idStudent: student.dni,
            idCompany: null,
            electivePeriod: periodElective,
            academicPeriod: newStudentsExcel.find((studentExcel) => studentExcel.dni === student.dni).periodAcademic,
            idProject: null,
            parallel: newStudentsExcel.find((studentExcel) => studentExcel.dni === student.dni).parallel,
            state: true,
          },
        });

      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
      //TODO: Actualizar el periodo academico y electivo

    });


    return new HttpException(
      'Estudiantes cargados correctamente',
      HttpStatus.OK,
    );
  }

  async create(createStudentDto: CreateStudentDto): Promise<StudentEntity> {
    // const studentExists = await this.findStudentByDni(createStudentDto.dni);
    // if (studentExists) {
    //   throw new HttpException('El estudiante ya existe', HttpStatus.CONFLICT);
    // }
    // createStudentDto.password = bcrypt.hashSync(createStudentDto.dni, 10);
    // try {
    //   return await this._prismaService.student.create({
    //     data: createStudentDto,
    //   });
    // } catch (error) {
    //   throw new HttpException(
    //     'Error al crear el estudiante',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
    return null;
  }

  async findAll(
    options: PaginationOptions,
    allActive?: boolean,
  ): Promise<StudentEntity[]> {
    const { page, limit } = options;
    try {
      const skip = (page - 1) * limit;
      return await this._prismaService.student.findMany({
        take: limit,
        skip,
        where: {
          state: allActive ? true : undefined,
        },
        include: {
          user: true,
          career: true,
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
    try {
      return await this._prismaService.student.findFirst({
        where: {
          idUser: dni,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<StudentEntity> {
    const studentExists = await this.findOne(id);
    if (!studentExists) {
      throw new HttpException('El estudiante no existe', HttpStatus.NOT_FOUND);
    }
    try {
      return await this._prismaService.student.update({
        where: {
          idUser: studentExists.idUser,
        },
        data: updateStudentDto,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async updateStatusStudent(
    id: number,
    status: StatusStudent,
  ): Promise<StudentEntity> {
    const studentExists = await this.findOne(id);
    if (!studentExists) {
      throw new HttpException('El estudiante no existe', HttpStatus.NOT_FOUND);
    }
    try {
      return await this._prismaService.student.update({
        where: {
          idUser: studentExists.idUser,
        },
        data: {
          status: status,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async remove(idUser: string): Promise<HttpException> {
    try {
      await this._prismaService.student.update({
        where: {
          idUser,
        },
        data: {
          state: false,
        },
      });
      return new HttpException(
        'Estudiante eliminado correctamente',
        HttpStatus.OK,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }
}
