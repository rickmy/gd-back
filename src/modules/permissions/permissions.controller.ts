import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  Put,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import {
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/auth/auth.guard';
import { PermissionDto } from './dto/permission.dto';
@ApiBearerAuth()
@ApiTags('permissions')
@Controller('permissions')
@UseGuards(JwtAuthGuard)
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @ApiOkResponse({
    type: CreatePermissionDto,
    status: 201,
    description: 'Crea un nuevo permiso',
  })
  @ApiOperation({ summary: 'Crear permiso' })
  create(@Body() permission: CreatePermissionDto): Promise<PermissionDto> {
    return this.permissionsService.create(permission);
  }

  @Get()
  @ApiResponse({
    type: PermissionDto,
    status: 200,
    description: 'Obtiene todos los permisos',
  })
  @ApiOperation({ summary: 'Obtener todos los permisos' })
  findAll(): Promise<PermissionDto[]> {
    return this.permissionsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    type: PermissionDto,
    status: 200,
    description: 'Obtiene un permiso por su ID',
  })
  @ApiResponse({ status: 404, description: 'Permiso no encontrado' })
  @ApiOperation({ summary: 'Obtener permiso por su ID' })
  findOne(@Param('id') id: string): Promise<PermissionDto> {
    return this.permissionsService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({
    type: UpdatePermissionDto,
    status: 200,
    description: 'Actualiza un permiso por su ID',
  })
  @ApiResponse({ status: 404, description: 'Permiso no encontrado' })
  @ApiOperation({ summary: 'Actualizar permiso por su ID' })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() permission: UpdatePermissionDto,
  ): Promise<PermissionDto> {
    return this.permissionsService.update(id, permission);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Elimina un permiso por su ID' })
  @ApiResponse({ status: 404, description: 'Permiso no encontrado' })
  @ApiOperation({ summary: 'Eliminar permiso por su ID' })
  remove(@Param('id', ParseIntPipe) id: string): Promise<HttpException> {
    return this.permissionsService.remove(id);
  }
}
