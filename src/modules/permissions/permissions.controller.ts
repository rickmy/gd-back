import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionEntity } from './entities/permission.entity';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Crea un nuevo permiso' })
   create(@Body() permission: CreatePermissionDto): Promise<PermissionEntity> {
    return this.permissionsService.create(permission);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Obtiene todos los permisos' })
   findAll(): Promise<CreatePermissionDto[]> {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Obtiene un permiso por su ID' })
  @ApiResponse({ status: 404, description: 'Permiso no encontrado' })
   findOne(@Param('id') id: string): Promise<PermissionEntity> {
    return this.permissionsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Actualiza un permiso por su ID' })
  @ApiResponse({ status: 404, description: 'Permiso no encontrado' })
   update(@Param('id') id: string, @Body() permission: PermissionEntity): Promise<PermissionEntity> {
    return this.permissionsService.update(id, permission);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Elimina un permiso por su ID' })
  @ApiResponse({ status: 404, description: 'Permiso no encontrado' })
   remove(@Param('id') id: string): Promise<HttpException> {

    return this.permissionsService.remove(id);

  }
}
