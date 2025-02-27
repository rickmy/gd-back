import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleWithPermission } from './dto/roleWithPermission.dto';
import { PermissionEntity } from '../permissions/entities/permission.entity';
import { RoleEntity } from './entities/role.entity';
import { PaginationOptions } from 'src/core/models/paginationOptions';
import { PaginationResult } from 'src/core/models/paginationResult';

@Injectable()
export class RoleService {
  private logger = new Logger(RoleService.name);
  constructor(private _prismaService: PrismaService) {}

  async create(createRoleDto: CreateRoleDto): Promise<HttpException> {
    const { code, name, permissions } = createRoleDto;
    const roleExist = await this._prismaService.rol.findFirst({
      where: {
        OR: [
          {
            code,
          },
          {
            name,
          },
        ],
      },
    });
    if (roleExist)
      throw new HttpException('El rol ya existe', HttpStatus.BAD_REQUEST);
    const role = await this._prismaService.rol.create({
      data: {
        code,
        name,
      },
    });
    if (!role)
      throw new HttpException(
        'Error al crear el rol',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    const rolHasPermission = permissions.map((permission) => {
      return {
        permissionId: permission,
        rolId: role.rolId,
      };
    });
    const rolesWithPermission =
      await this._prismaService.rolHasPermission.createMany({
        data: rolHasPermission,
      });
    if (!rolesWithPermission)
      throw new HttpException(
        'Error al enlazar el rol con sus permisos',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return new HttpException('Rol creado correctamente', 201);
  }

  async findAll(
    options: PaginationOptions,
    allActive?: boolean,
  ): Promise<PaginationResult<RoleEntity>> {
    try {
      const { page, limit } = options;

      const optionsWhere = {
        state: allActive ? true : undefined,
        name: options.name ? { contains: options.name } : undefined,
        code: options.identification
          ? { contains: options.identification }
          : undefined,
      };

      const hasFilter = !!options.name || !!options.identification;

      const roles = await this._prismaService.rol.findMany({
        where: optionsWhere,
        take: hasFilter ? undefined : limit,
        skip: hasFilter ? undefined : page,
      });

      const total = await this._prismaService.rol.count({
        where: optionsWhere,
      });

      if (!roles || roles.length === 0)
        return new PaginationResult<RoleEntity>([], total, page, limit);

      return new PaginationResult<RoleEntity>(roles, total, page, limit);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(rolId: string) {
    try {
      return await this._prismaService.rol.findFirstOrThrow({
        where: {
          rolId,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findRoleByName(name: string): Promise<RoleEntity> {
    try {
      const nameRole = '%' + name + '%';
      const role = await this._prismaService
        .$queryRaw<RoleEntity>`SELECT * FROM "Rol" WHERE name LIKE ${nameRole}`;
      if (!role) throw new HttpException('El rol no existe', 404);
      this.logger.log('Rol encontrado');
      return role;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findByCode(code: string): Promise<RoleEntity> {
    try {
      const role = await this._prismaService.rol.findFirst({
        where: {
          code,
        },
      });
      if (!role) throw new HttpException('El rol no existe', 404);
      this.logger.log('Rol encontrado');
      return role;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findRoleWithPermissions(
    rolId: string,
    all?: boolean,
  ): Promise<RoleWithPermission> {
    const role = await this.findOne(rolId);
    let permissionsWithRole = [];
    try {
      permissionsWithRole = await this._prismaService.rolHasPermission.findMany(
        {
          where: {
            rolId,
            state: all ? undefined : true,
          },
          include: {
            permission: true,
          },
        },
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
    const permissions: PermissionEntity[] = permissionsWithRole.map(
      (permission) => {
        return {
          ...permission.permission,
        };
      },
    );
    return {
      role,
      permissions,
    };
  }

  async update(
    rolId: string,
    updateRoleDto: UpdateRoleDto,
  ): Promise<RoleWithPermission> {
    const { permissions } = updateRoleDto;

    const roleUpdate = await this.updateOnlyRole(rolId, updateRoleDto);

    if (!roleUpdate) throw new NotFoundException('Error al actualizar el rol');

    const permissionDB = (await this.findRoleWithPermissions(rolId, true))
      .permissions;

    const permissionDelete = permissionDB.filter((permission) => {
      return !permissions.some((permissionUpdate) => {
        return permissionUpdate === permission.permissionId;
      });
    });

    const permissionCreate = permissions.filter((permission) => {
      return !permissionDB.some((permissionUpdate) => {
        return permissionUpdate.permissionId === permission;
      });
    });

    if (permissionDelete.length > 0) {
      try {
        await this._prismaService.rolHasPermission.updateMany({
          where: {
            rolId,
            permissionId: {
              in: permissionDelete.map((permission) => permission.permissionId),
            },
          },
          data: {
            state: false,
          },
        });
      } catch (error) {
        throw new HttpException(error.message, error.status);
      }
    }
    if (permissionCreate.length > 0) {
      const rolHasPermission = permissionCreate.map((permission) => {
        return {
          permissionId: permission,
          rolId,
        };
      });

      try {
        await this._prismaService.rolHasPermission.createMany({
          data: rolHasPermission,
        });
      } catch (error) {
        throw new HttpException(error.message, error.status);
      }
    }
    return await this.findRoleWithPermissions(rolId);
  }

  async updateOnlyRole(
    rolId: string,
    updateRoleDto: UpdateRoleDto,
  ): Promise<RoleEntity> {
    const { name } = updateRoleDto;
    try {
      return await this._prismaService.rol.update({
        where: {
          rolId,
        },
        data: {
          name,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(rolId: string): Promise<HttpException> {
    try {
      await this._prismaService.rol.update({
        where: {
          rolId,
        },
        data: {
          state: false,
        },
      });
      return new HttpException('Rol eliminado correctamente', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
