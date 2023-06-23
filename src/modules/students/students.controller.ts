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
} from '@nestjs/swagger';
import { StudentEntity } from './entities/student.entity';
import { JwtAuthGuard } from 'src/auth/guards/auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateStudentDto } from './dto/update-student.dto';

import { StudentsDto } from './dto/students.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('students')
@ApiTags('student')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @ApiOkResponse({ description: 'Estudiante creado', type: CreateStudentDto })
  @ApiOperation({ summary: 'Crear estudiante' })
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @UseInterceptors(FileInterceptor('file'))
  @ApiOkResponse({
    description: 'Estudiantes subidos',
    type: CreateStudentDto,
    isArray: true,
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
    @Body() updateStudentDto: StudentEntity,
  ) {
    return this.studentsService.updateStatusStudent(
      +id,
      updateStudentDto.status,
    );
  }

  @ApiOkResponse({
    description: 'Estudiantes encontrados',
    type: StudentEntity,
    isArray: true,
  })
  @ApiOperation({ summary: 'Encontrar todos los estudiantes' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
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
    description: 'Estudiantes activos encontrados',
    type: StudentsDto,
    isArray: true,
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

  @ApiOkResponse({ description: 'Estudiante encontrado', type: StudentEntity })
  @ApiOperation({ summary: 'Encontrar un estudiante por su ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @ApiOkResponse({
    description: 'Estudiante Actualizado',
    type: CreateStudentDto,
  })
  @ApiOperation({ summary: 'Actualizar un estudiante por su ID' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: StudentEntity) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Elimina un estudiante por su ID' })
  @ApiResponse({ status: 404, description: 'Estudiante no encontrado' })
  @ApiOperation({ summary: 'Eliminar estudiante por su ID' })
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
