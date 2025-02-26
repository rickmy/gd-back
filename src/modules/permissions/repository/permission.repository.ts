import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { CreatePermissionDto } from '../dto/create-permission.dto';

@Injectable()
export class PermissionRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  create(permission: CreatePermissionDto) {
    return this._prismaService.permission.create({
      data: permission,
      include: {
        action: true,
        resource: true,
      },
    });
  }

  findAll() {
    return this._prismaService.permission.findMany({
      where: {
        state: true,
      },
      orderBy: {
        createdAt: Prisma.SortOrder.asc,
      },
      include: {
        action: true,
        resource: true,
      },
    });
  }

  async findOne(permissionId: string) {
    return this._prismaService.permission.findUnique({
      where: {
        permissionId,
      },
      include: {
        action: true,
        resource: true,
      },
    });
  }

  async update(permissionId: string, permission: UpdatePermissionDto) {
    return this._prismaService.permission.update({
      where: {
        permissionId,
      },
      data: permission,
      include: {
        action: true,
        resource: true,
      },
    });
  }

  async delete(permissionId: string) {
    return this._prismaService.permission.update({
      where: {
        permissionId,
      },
      data: {
        state: false,
      },
    });
  }
}
