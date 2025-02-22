import {
  Injectable,
  UnprocessableEntityException,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
import { PayloadModel } from 'src/auth/models/payloadModel';
import { UserDto } from './dto/user.dto';
import { PaginationResult } from 'src/core/models/paginationResult';
import { PaginationOptions } from 'src/core/models/paginationOptions';
import { mapUser } from './mapper/user.mapper';
import { UserRepository } from './repository/user.repository';
import { buildWhereConditions } from '@core/utils/buildWhereCondition.utils';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  _prismaService: any;
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto | null> {
    try {
      this.logger.log('Creando usuario');
      const newUser = await this.userRepository.create(createUserDto);
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

      const basicFilter = buildWhereConditions(options, allActive, 'dni');

      const users = await this.userRepository.findAll(basicFilter, limit, page);

      if (!users)
        throw new HttpException(
          'No se encontraron usuarios',
          HttpStatus.NO_CONTENT,
        );
      return {
        results: users.map((user) => mapUser(user, user.rol.name)),
        total: await this.userRepository.getTotalCount(allActive),
        page,
        limit,
      };
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  async findOne(id: string): Promise<UserDto> {
    try {
      this.logger.log('Buscando usuario por ID');
      const user = await this.userRepository.findBy('userId', id);
      if (!user)
        throw new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
      return mapUser(user, user.rol.name);
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  async findAllByRole(rolId: string): Promise<UserDto[]> {
    try {
      const users = await this.userRepository.findByRol(rolId);

      if (!users)
        throw new HttpException(
          'No se encontraron usuarios',
          HttpStatus.NOT_FOUND,
        );

      return users.map((user) => mapUser(user, user.rol.name));
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async findByEmail(email: string) {
    this.logger.log('Buscando usuario por email');
    return await this.userRepository.findBy('email', email);
  }

  async findByDni(dni: string) {
    this.logger.log('Buscando usuario por dni');
    return await this.userRepository.findBy('dni', dni);
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
  ): Promise<UserDto | null> {
    const user = await this.findOne(userId);
    if (!user) throw new UnprocessableEntityException('El usuario no existe');
    try {
      const updatedUser = await this.userRepository.update(
        userId,
        updateUserDto,
      );
      return mapUser(updatedUser, user.rol);
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async updatePassword(
    userId: string,
    password: string,
    salt: string,
  ): Promise<UserDto | null> {
    try {
      const user = await this.findOne(userId);
      if (!user) throw new UnprocessableEntityException('El usuario no existe');
      const updatedUser = await this.userRepository.updatePassword(
        userId,
        password,
        salt,
      );
      return mapUser(updatedUser, user.rol);
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async remove(id: string): Promise<HttpException | void> {
    try {
      await this.userRepository.softDelete(id);
      return new HttpException('Usuario eliminado', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
}
