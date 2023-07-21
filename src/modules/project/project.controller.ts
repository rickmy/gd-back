import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectEntity } from './entities/project.entity';
import { PaginationOptions } from 'src/core/models/paginationOptions';
import { ProjectDto } from './dto/project.dto';
import { ProjectInfoDto } from './dto/project-info.dto';

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
  @Post(':idCompany')
  findAll(@Param('idCompany', ParseIntPipe) idCompany: number,@Body() options: PaginationOptions) {
    return this.projectService.findAll(idCompany, options );
  }

  @Post('active/:idCompany')
  @ApiOkResponse({
    description: 'Proyectos activos encontrados',
    type: PaginationOptions,
    isArray: true,
  })
  @ApiOperation({ summary: 'Encontrar todos los proyectos activos' })
  findAllActive(@Param('idCompany', ParseIntPipe) idCompany: number,@Body() options: PaginationOptions) {
    return this.projectService.findAll(idCompany, options, true);
  }

  @Post(':id/assign-academic-tutor/:academicTutorId')
  assignAcademicTutor(
    @Param('id', ParseIntPipe) projectId: number,
    @Param('academicTutorId', ParseIntPipe) academicTutorId: number,
  ) {
    return this.projectService.assignAcademicTutor(
      projectId,
      academicTutorId,
    );
  }

  @ApiOkResponse({
    description: 'Información del proyecto encontrada',
    type: ProjectInfoDto,
  })
  @ApiOperation({ summary: 'Encontrar información del proyecto por su ID' })
  @Get(':id')
  findProjectInfoById(@Param('id', ParseIntPipe) id: number) {
    return this.projectService.findProjectInfoById(id);
  }

  @Post(':id/assign-business-tutor/:businessTutorId')
  assignBusinessTutor(
    @Param('id', ParseIntPipe) projectId: number,
    @Param('businessTutorId', ParseIntPipe) businessTutorId: number,
  ) {
    return this.projectService.assignBusinessTutor(
      projectId,
      businessTutorId,
    );
  }
  
  @Post(':id/assign-student/:studentId')
  assignStudent(
    @Param('id', ParseIntPipe) projectId: number,
    @Param('studentId', ParseIntPipe) studentId: number,
  ) {
    return this.projectService.assignStudent(
      projectId,
      studentId,
    );
  }

  

  @ApiOkResponse({
    description: 'Proyecto Actualizado',
   
  })
  @ApiOperation({ summary: 'Actualizar un proyecto por su ID' })
  @Put(':id')
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
