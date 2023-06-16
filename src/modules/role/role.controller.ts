import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger/dist';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';


@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @ApiOkResponse({ description: 'Rol creado', type: CreateRoleDto })
  @ApiOperation({ summary: 'Crear rol' })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @ApiOkResponse({
    type: RoleEntity,
    description: 'Roles encontrado',
    isArray: true,
  })
  @ApiOperation({ summary: 'Encontrar todos los roles' })
  findAll() {
    return this.roleService.findAll();
  }
  @Get('active')
  @ApiOkResponse({
    type: RoleEntity,
    description: 'Roles activos encontrados',
    isArray: true,
  })
  @ApiOperation({ summary: 'Encontrar todos los roles activos' })
  findAllActive() {
    return this.roleService.findAll(true);
  }

  @Get(':id')
  @ApiOkResponse({
    type: CreateRoleDto,
    description: 'Rol encontrado',
  })
  @ApiOperation({ summary: 'Encontrar un rol por su ID' })
  findOne(@Param('id') id: string) {
    return this.roleService.findRoleWithPermissions(+id);
  }

  @Put(':id')
  @ApiOkResponse({ type: CreateRoleDto, description: 'Rol actualizado' })
  @ApiOperation({ summary: 'Actualizar un rol por su ID' })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: CreateRoleDto, description: 'Rol eliminado' })
  @ApiOperation({ summary: 'Eliminar un rol por su ID' })
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
