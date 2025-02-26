import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionEntity } from './entities/permission.entity';
import { mapPermissionToDto } from './mappers/permission.mapper';
import { PermissionDto } from './dto/permission.dto';
import { PermissionRepository } from './repository/permission.repository';
@Injectable()
export class PermissionsService {
  constructor(private permissionRepository: PermissionRepository) {}

  async create(permission: CreatePermissionDto): Promise<PermissionDto> {
    try {
      const createdPermission = await this.permissionRepository.create(
        permission,
      );
      return mapPermissionToDto(
        createdPermission,
        createdPermission.action.name,
        createdPermission.resource.name,
      );
    } catch (error) {
      throw new HttpException(
        'No se pudo crear el permiso',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<PermissionDto[]> {
    try {
      const permissions = await this.permissionRepository.findAll();

      return permissions.map((permission) =>
        mapPermissionToDto(
          permission,
          permission.action.name,
          permission.resource.name,
        ),
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(permissionId: string): Promise<PermissionDto> {
    const permission = await this.permissionRepository.findOne(permissionId);
    if (!permission)
      throw new HttpException(
        `Permiso con el id: ${permissionId}, no existe`,
        HttpStatus.NOT_FOUND,
      );
    return mapPermissionToDto(
      permission,
      permission.action.name,
      permission.resource.name,
    );
  }

  async update(
    permissionId: string,
    permission: UpdatePermissionDto,
  ): Promise<PermissionDto> {
    const permissionUpdate = await this.permissionRepository.update(
      permissionId,
      permission,
    );
    if (!permissionUpdate)
      throw new HttpException(
        `Permiso con el id:${permissionId}, no existe`,
        HttpStatus.NOT_FOUND,
      );
    return mapPermissionToDto(
      permissionUpdate,
      permissionUpdate.action.name,
      permissionUpdate.resource.name,
    );
  }

  async remove(permissionId: string): Promise<HttpException> {
    await this.permissionRepository.delete(permissionId);
    return new HttpException(
      `Permiso:${permissionId} eliminado`,
      HttpStatus.OK,
    );
  }
}
