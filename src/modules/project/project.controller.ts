import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectEntity } from './entities/project.entity';

@Controller('project')
@ApiTags('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiCreatedResponse({ description: 'Proyecto creado', type: CreateProjectDto })
  @ApiOperation({ summary: 'Crear proyecto' })
  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }


  @ApiOkResponse({
    description: 'Proyectos encontrados',
    type: ProjectEntity,
    isArray: true,
  })
  @ApiOperation({ summary: 'Encontrar todos los proyectos' })
  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @ApiOkResponse({ description: 'Proyecto encontrado', type: ProjectEntity })
  @ApiOperation({ summary: 'Encontrar un proyecto por su ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  @ApiOkResponse({
    description: 'Proyecto Actualizado',
   
  })
  @ApiOperation({ summary: 'Actualizar un proyecto por su ID' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(+id, updateProjectDto);
  }

  @ApiResponse({ status: 200, description: 'Elimina un proyecto por su ID' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  @ApiOperation({ summary: 'Eliminar proyecto por su ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
