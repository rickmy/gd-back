import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Put,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiParam,
} from '@nestjs/swagger';
import { StudentEntity } from './entities/student.entity';
import { JwtAuthGuard } from 'src/auth/guards/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateStudentDto } from './dto/update-student.dto';

import { StudentsDto } from './dto/students.dto';
import { PaginationResult } from 'src/core/models/paginationResult';
import { StudentDto } from './dto/student.dto';
import { AssignedToProjectDto } from './dto/assigned-to-project.dto';
import { AssignedToCompanyDto } from './dto/assigned-to-company.dto';


@ApiBearerAuth()
@Controller('students')
@ApiTags('student')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) { }

  @ApiCreatedResponse({ description: 'Estudiante creado', type: CreateStudentDto })
  @ApiOperation({ summary: 'Crear estudiante' })
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @UseInterceptors(FileInterceptor('file'))
  @ApiOkResponse({
    description: 'Estudiantes subidos'
  })
  @ApiBody({ required: true, type: FileInterceptor })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Subir excel de los estudiantes' })
  @Post('upload')
  uploadStudents(@UploadedFile() file: Express.Multer.File) {
    return this.studentsService.uploadStudents(file);
  }

  @ApiOkResponse({
    description: 'Status del estudiante actualizado',
    type: CreateStudentDto,
  })
  @ApiOperation({ summary: 'Actualizar el status de un estudiante por su ID' })
  @Put('status/:id')
  updateStatusStudent(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.updateStatusStudent(
      +id,
      updateStudentDto.status,
    );
  }

  @ApiOperation({ summary: 'Encontrar todos los estudiantes' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOkResponse({
    description: 'Estudiantes encontrados',
    type: PaginationResult<StudentsDto>,
  })
  @Get()
  findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    const options = {
      page: page || 1,
      limit: limit || 10,
    };
    return this.studentsService.findAll(options);
  }

  @Get('active')
  @ApiOkResponse({
    description: 'Estudiantes encontrados',
    type: PaginationResult<StudentsDto>,
  })
  @ApiOperation({ summary: 'Encontrar todos los estudiantes activos' })
  findAllActive(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    const options = {
      page: page || 1,
      limit: limit || 10,
    };
    return this.studentsService.findAll(options, true);
  }

  @ApiOkResponse({ description: 'Estudiante encontrado', type: StudentDto })
  @ApiOperation({ summary: 'Encontrar un estudiante por su Id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @ApiOkResponse({
    description: 'Estudiante Actualizado',
    type: CreateStudentDto,
  })
  @ApiOperation({ summary: 'Actualizar un estudiante por su IDNI' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: StudentEntity) {
    return this.studentsService.update(+id, updateStudentDto);
  }
  

  @Put('assign-to-project')
  @ApiOkResponse({
    description: 'Estudiante asignado a proyecto',
    type: CreateStudentDto,
  })
  @ApiOperation({ summary: 'Asignar un estudiante a un proyecto' })
  @ApiBody({ type: AssignedToProjectDto })
  assignToProject(@Body() body: AssignedToProjectDto) {
    return this.studentsService.assignToProject(body);
  }

  @Put('unassign-to-project/:id')
  @ApiOkResponse({
    description: 'Estudiante desasignado a proyecto',
    type: CreateStudentDto,
  })
  @ApiOperation({ summary: 'Desasignar un estudiante a un proyecto' })
  @ApiParam({ name: 'id', required: true, type: Number })
  unassignToProject(@Param('id') id: string) {
    return this.studentsService.unassignToProject(+id);
  }

  @Put('assign-to-company')
  @ApiOkResponse({
    description: 'Estudiante asignado a empresa',
    type: CreateStudentDto,
  })
  @ApiOperation({ summary: 'Asignar un estudiante a una empresa' })
  @ApiBody({ type: AssignedToCompanyDto })
  assignToCompany(@Body() body: AssignedToCompanyDto) {
    return this.studentsService.assignToCompany(body);
  }

  @Put('unassign-to-company/:id')
  @ApiOkResponse({
    description: 'Estudiante desasignado a empresa',
    type: CreateStudentDto,
  })
  @ApiOperation({ summary: 'Desasignar un estudiante a una empresa' })
  @ApiParam({ name: 'id', required: true, type: Number })
  unassignToCompany(@Param('id') id: string) {
    return this.studentsService.unassignToCompany(+id);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Elimina un estudiante por su DNI' })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' })
  @ApiOperation({ summary: 'Eliminar estudiante por su ID' })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
