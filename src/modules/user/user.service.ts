import {
  Injectable,
  UnprocessableEntityException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PayloadModel } from 'src/auth/models/payloadModel';
import { error } from 'console';

@Injectable()
export class UserService {
  constructor(private _prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User | null> {
    const { dni, email } = createUserDto;
    const existDni = await this.findByDni(dni);
    if (existDni)
      throw new UnprocessableEntityException('El usuario ya existe');
    const existEmail = await this.findByEmail(email);
    if (existEmail)
      throw new UnprocessableEntityException('El usuario ya existe');
    createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);
    const newUser = this._prismaService.user.create({
      data: createUserDto,
    });
    return newUser;
  }

  async comparePassword(
    password: string,
    storedPasswordHash: string,
  ): Promise<boolean> {
    return bcrypt.compareSync(password, storedPasswordHash);
  }

  async validateUser(payload: PayloadModel): Promise<boolean> {
    const user = await this.findByEmail(payload.email);
    if (!user) {
      throw new HttpException('Usuario no existe', HttpStatus.UNAUTHORIZED);
    }
    return !!user;
  }

  hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  async findAll(onlyActive?: boolean, idRole?: number): Promise<User[]> {
    try {
      const users = await this._prismaService.user.findMany({
        where: {
          state: onlyActive ? true : undefined,
          idRol: idRole ? idRole : undefined,
        },
      });
      return users.map((user) => {
        delete user.password;
        return user;
      });
    } catch (error) {
      throw new HttpException(error, error.status || 500);
    }
  }

  findOne(dni: string) {
    try {
      return this._prismaService.user.findUnique({
        where: {
          dni,
        },
      });
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  findByEmail(email: string) {
    return this._prismaService.user.findUnique({
      where: {
        email,
      },
      include: {
        rol: {
          select: {
            name: true,
            state: true,
          },
        },
      },
    });
  }

  findByDni(dni: string) {
    return this._prismaService.user.findUnique({
      where: {
        dni,
      },
    });
  }

  async update(dni: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.findOne(dni);
    if (!user) throw new UnprocessableEntityException('El usuario no existe');
    try {
      const updatedUser = await this._prismaService.user.update({
        where: {
          dni: user.dni,
        },
        data: updateUserDto,
      });
      return updatedUser;
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  remove(dni: string) {
    try {
      return this._prismaService.user.update({
        where: {
          dni,
        },
        data: {
          state: false,
        },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
