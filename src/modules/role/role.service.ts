import {
  BadRequestException,
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
import { PaginationOptions } from 'src/core/models/paginationOptions';
import { PaginationResult } from 'src/core/models/paginationResult';
import { ResourceRepository } from '@modules/permissions/repository/resource.repository';
import { mapPermissionToDto } from '@modules/permissions/mappers/permission.mapper';
import { ResourceWithPermission } from '@modules/permissions/dto/resource-with-permission.dto';
import { RolRepository } from './repository/rol.repository';
import { CreateRoleHasPermissionDto } from './dto/create-role-has-permission.dto';
import { buildWhereConditions } from '@core/utils/buildWhereCondition.utils';
import { RolDto } from './dto/rol.dto';
import { mapRolToDto } from './mappers/mapRolToDto.mapper';
import { mapRolWithPermissionToDto } from './mappers/mapRolWithPermissionToDto.mapper';

@Injectable()
export class RoleService {
  private logger = new Logger(RoleService.name);
  constructor(
    private _prismaService: PrismaService,
    private _resourceRepository: ResourceRepository,
    private _rolRepository: RolRepository,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<RoleWithPermission> {
    const { code, name, permissions } = createRoleDto;
    await this.validateCodeNotExist(code, name);
    const role = await this._rolRepository.create(code, name);
    if (!role)
      throw new HttpException(
        'Error al crear el rol',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    const rolHasPermission: CreateRoleHasPermissionDto[] = permissions.map(
      (permission) => {
        return {
          permissionId: permission.permissionId,
          state: permission.selected,
          rolId: role.rolId,
        };
      },
    );
    const rolesWithPermission =
      await this._rolRepository.createRolHasPermission(rolHasPermission);
    if (!rolesWithPermission)
      throw new HttpException(
        'Error al enlazar el rol con sus permisos',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return await this.findOne(role.rolId);
  }

  async findAll(
    options: PaginationOptions,
    allActive?: boolean,
  ): Promise<PaginationResult<RolDto>> {
    try {
      const { page, limit } = options;

      const whereConditions = buildWhereConditions(options, allActive, 'rolId');

      const roles = await this._rolRepository.findAll(
        whereConditions,
        limit,
        page,
      );

      const total = await this._rolRepository.getTotalCount(allActive);

      if (!roles || roles.length === 0)
        throw new HttpException(
          'No se encontraron roles',
          HttpStatus.NO_CONTENT,
        );

      return {
        results: roles.map(mapRolToDto),
        total: total,
        page,
        limit,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(rolId: string): Promise<RoleWithPermission> {
    try {
      const rol = await this._rolRepository.findOne(rolId);

      if (!rol) throw new NotFoundException(`El rol con id ${rolId} no existe`);

      const permissionIds = rol.rolHasPermission.map(
        (permission) => permission.permissionId,
      );
      const allPermission = await this._resourceRepository.findOneByPermissions(
        permissionIds,
      );
      const resourceWithPermission: ResourceWithPermission[] =
        allPermission.map((permission) => ({
          resource: permission.name,
          permissions: permission.permission.map((perm) =>
            mapPermissionToDto(perm, perm.action.name),
          ),
        }));

      resourceWithPermission.forEach((src) => {
        src.permissions.forEach((perm) => {
          const exist = rol.rolHasPermission.find(
            (p) => p.permissionId === perm.permissionId,
          );
          if (exist) perm.selected = exist.state;
        });
      });

      return mapRolWithPermissionToDto(rol, resourceWithPermission);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async validateCodeNotExist(code: string, name: string, rolId?: string) {
    const rol = await this._rolRepository.findByCondition(code, name, rolId);
    if (rol) {
      throw new BadRequestException(
        `Rol with code ${code} or name: ${name} already exists`,
      );
    }
  }

  async update(
    rolId: string,
    updateRoleDto: UpdateRoleDto,
  ): Promise<RoleWithPermission> {
    await this.validateCodeNotExist(
      updateRoleDto.code,
      updateRoleDto.name,
      rolId,
    );

    const { permissions } = updateRoleDto;

    const roleUpdate = await this._rolRepository.update(rolId, updateRoleDto);

    if (!roleUpdate) throw new NotFoundException('Error al actualizar el rol');

    const rolHasPermission: CreateRoleHasPermissionDto[] = permissions.map(
      (permission) => {
        return {
          permissionId: permission.permissionId,
          state: permission.selected,
          rolId: rolId,
        };
      },
    );

    const rolesWithPermission =
      await this._rolRepository.updateRolHasPermission(rolHasPermission);
    if (!rolesWithPermission)
      throw new HttpException(
        'Error al enlazar el rol con sus permisos',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    return await this.findOne(rolId);
  }

  async remove(rolId: string): Promise<HttpException> {
    try {
      await this._rolRepository.softDelete(rolId);
      return new HttpException('Rol eliminado correctamente', HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
