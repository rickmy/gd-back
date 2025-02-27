import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger/dist';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth/auth.guard';
import { PaginationResult } from 'src/core/models/paginationResult';
import { RolHasPermission } from '@prisma/client';
import { FilterRolDto } from './dto/filter-rol.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('rol')
@Controller('rol')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOkResponse({ description: 'Rol creado', type: CreateRoleDto })
  @ApiOperation({ summary: 'Crear rol' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Post('all')
  @ApiOkResponse({
    type: PaginationResult<RolHasPermission>,
    description: 'Roles encontrado',
  })
  @ApiOperation({ summary: 'Encontrar todos los roles' })
  findAll(@Body() options: FilterRolDto) {
    return this.roleService.findAll(options);
  }
  @Post('active')
  @ApiOkResponse({
    type: PaginationResult<RolHasPermission>,
    description: 'Roles activos encontrados',
  })
  @ApiOperation({ summary: 'Encontrar todos los roles activos' })
  findAllActive(@Body() options: FilterRolDto) {
    return this.roleService.findAll(options, true);
  }

  @Get(':id')
  @ApiOkResponse({
    type: CreateRoleDto,
    description: 'Rol encontrado',
  })
  @ApiOperation({ summary: 'Encontrar un rol por su ID' })
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: CreateRoleDto, description: 'Rol actualizado' })
  @ApiOperation({ summary: 'Actualizar un rol por su ID' })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: CreateRoleDto, description: 'Rol eliminado' })
  @ApiOperation({ summary: 'Eliminar un rol por su ID' })
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
