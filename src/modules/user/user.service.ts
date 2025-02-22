import {
  Injectable,
  UnprocessableEntityException,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { PayloadModel } from 'src/auth/models/payloadModel';
import { UserDto } from './dto/user.dto';
import { PaginationResult } from 'src/core/models/paginationResult';
import { PaginationOptions } from 'src/core/models/paginationOptions';
import { mapUser } from './mapper/user.mapper';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  constructor(private _prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto | null> {
    try {
      this.logger.log('Creando usuario');
      const newUser = await this._prismaService.user.create({
        data: {
          name: createUserDto.name,
          lastName: createUserDto.lastName,
          email: createUserDto.email,
          dni: createUserDto.dni,
          password: createUserDto.password,
          salt: createUserDto.salt,
          rolId: createUserDto.rolId,
          completeName: createUserDto.completeName,
        },
        include: {
          rol: true,
        },
      });
      this.logger.log('Usuario creado');
      return mapUser(newUser, newUser.rol.name);
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async validateUser(payload: PayloadModel): Promise<boolean> {
    const user = await this.findByEmail(payload.email);
    if (!user) {
      throw new HttpException('Usuario no existe', HttpStatus.UNAUTHORIZED);
    }
    return !!user;
  }

  async findAll(
    options: PaginationOptions,
    allActive?: boolean,
  ): Promise<PaginationResult<UserDto>> {
    try {
      const { page, limit } = options;

      const hasFilter =
        !!options.name || !!options.identification || !!options.email;

      const users = await this._prismaService.user.findMany({
        where: {
          state: allActive ? true : undefined,
          name: hasFilter
            ? {
                contains: options.name,
                mode: Prisma.QueryMode.insensitive,
              }
            : undefined,
          dni: hasFilter
            ? {
                contains: options.identification,
                mode: Prisma.QueryMode.insensitive,
              }
            : undefined,
          email: hasFilter
            ? {
                contains: options.email,
                mode: Prisma.QueryMode.insensitive,
              }
            : undefined,
        },
        include: {
          rol: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: Prisma.SortOrder.desc,
        },
        take: hasFilter ? undefined : limit,
        skip: hasFilter ? undefined : page,
      });

      if (!users)
        throw new HttpException(
          'No se encontraron usuarios',
          HttpStatus.NO_CONTENT,
        );
      return {
        results: users.map((user) => {
          delete user.password;
          return {
            ...user,
            id: user.userId,
            rol: user.rol.name,
          };
        }),
        total: await this._prismaService.user.count({
          where: {
            state: allActive ? true : undefined,
          },
        }),
        page,
        limit,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this._prismaService.user.findUnique({
        where: {
          userId: id,
        },
        select: {
          id: true,
          dni: true,
          name: true,
          lastName: true,
          email: true,
          rol: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
        },
      });
      if (!user)
        throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
      return user;
    } catch (error) {
      throw new HttpException(error, 500);
    }
  }

  async findAllByRole(rolId: string): Promise<UserDto[]> {
    try {
      const users = await this._prismaService.user.findMany({
        where: {
          rolId,
          state: true,
        },
        include: {
          rol: {
            select: {
              name: true,
            },
          },
        },
      });

      if (!users)
        throw new HttpException(
          'No se encontraron usuarios',
          HttpStatus.NOT_FOUND,
        );

      return users.map((user) => {
        delete user.password;
        return {
          ...user,
          id: user.userId,
          rol: user.rol.name,
        };
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findByEmail(email: string) {
    return await this._prismaService.user.findUnique({
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

  async findByDni(dni: string) {
    return await this._prismaService.user.findUnique({
      where: {
        dni,
      },
    });
  }

  async changeRole(userId: string, rolId: string) {
    try {
      const user = await this.findOne(userId);
      if (!user) throw new UnprocessableEntityException('El usuario no existe');
      const updatedUser = await this._prismaService.user.update({
        where: {
          userId,
        },
        data: {
          rolId,
        },
      });
      if (!updatedUser)
        throw new UnprocessableEntityException('No se pudo actualizar el rol');
      return updatedUser;
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | null> {
    const user = await this.findOne(userId);
    if (!user) throw new UnprocessableEntityException('El usuario no existe');
    try {
      const updatedUser = await this._prismaService.user.update({
        where: {
          userId,
        },
        data: updateUserDto,
      });
      return updatedUser;
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async updatePassword(
    userId: string,
    password: string,
    salt: string,
  ): Promise<User | null> {
    try {
      const user = await this.findOne(userId);
      if (!user) throw new UnprocessableEntityException('El usuario no existe');
      const updatedUser = await this._prismaService.user.update({
        where: {
          userId,
        },
        data: {
          password,
          salt,
        },
      });
      return updatedUser;
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async remove(id: string) {
    try {
      return await this._prismaService.user.update({
        where: {
          userId: id,
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
