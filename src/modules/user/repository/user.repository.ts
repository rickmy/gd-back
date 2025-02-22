import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { getSkip, getTake } from '@core/utils/pagination.utils';
import { Prisma } from '.prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prismaService.user.create({
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
  }

  async findAll<T>(whereConditions: T, limit: number, page: number) {
    return this.prismaService.user.findMany({
      where: whereConditions,
      orderBy: {
        createdAt: Prisma.SortOrder.desc,
      },
      take: getTake(limit, whereConditions),
      skip: getSkip(page, limit, whereConditions),
      include: {
        rol: true,
      },
    });
  }

  async findBy<T>(key: string, value: T) {
    return this.prismaService.user.findFirst({
      where: {
        [key]: value,
      },
      include: {
        rol: true,
      },
    });
  }

  async findByRol(rolId: string) {
    return this.prismaService.user.findMany({
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
  }

  async update(userId: string, data: UpdateUserDto) {
    return this.prismaService.user.update({
      where: {
        userId,
      },
      data,
      include: {
        rol: true,
      },
    });
  }

  async updatePassword(userId: string, password: string, salt: string) {
    return this.prismaService.user.update({
      where: {
        userId,
      },
      data: {
        password,
        salt,
      },
    });
  }

  async softDelete(userId: string) {
    return this.prismaService.user.update({
      where: {
        userId,
      },
      data: {
        state: false,
      },
    });
  }

  async getTotalCount(allActive?: boolean): Promise<number> {
    return this.prismaService.career.count({
      where: { state: allActive ? true : undefined },
    });
  }
}
