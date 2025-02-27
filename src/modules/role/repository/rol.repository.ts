import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRoleHasPermissionDto } from '../dto/create-role-has-permission.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable()
export class RolRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(code: string, name: string) {
    return this._prismaService.rol.create({
      data: {
        code,
        name,
      },
    });
  }

  async findOne(rolId: string) {
    return this._prismaService.rol.findFirstOrThrow({
      where: {
        rolId,
      },
      include: {
        rolHasPermission: {
          select: {
            permissionId: true,
            state: true,
          },
        },
      },
    });
  }

  async findByCondition(code: string, name: string, rolId?: string) {
    return this._prismaService.rol.findFirst({
      where: {
        code,
        name,
        rolId: !!rolId
          ? {
              not: rolId,
            }
          : undefined,
      },
    });
  }

  async update(rolId: string, rolData: UpdateRoleDto) {
    return this._prismaService.rol.update({
      where: { rolId },
      data: {
        name: rolData.name,
        code: rolData.code,
      },
    });
  }

  async createRolHasPermission(rolHasPermission: CreateRoleHasPermissionDto[]) {
    return this._prismaService.rolHasPermission.createMany({
      data: rolHasPermission,
    });
  }

  async updateRolHasPermission(rolHasPermission: CreateRoleHasPermissionDto[]) {
    const updatePromises = rolHasPermission.map((rol) => {
      return this._prismaService.rolHasPermission.updateMany({
        where: {
          rolId: rol.rolId,
          permissionId: rol.permissionId,
        },
        data: {
          state: rol.state,
        },
      });
    });
    return await Promise.all(updatePromises);
  }

  async softDelete(rolId: string) {
    return this._prismaService.rol.update({
      where: { rolId },
      data: { state: false },
    });
  }

  async getTotalCount(allActive?: boolean): Promise<number> {
    return this._prismaService.rol.count({
      where: { state: allActive ? true : undefined },
    });
  }
}
