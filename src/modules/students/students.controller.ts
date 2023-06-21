import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StudentEntity } from './entities/student.entity';
import { JwtAuthGuard } from 'src/auth/guards/auth/auth.guard';

@UseGuards(JwtAuthGuard)
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

  @ApiOkResponse({ description: 'Estudiantes encontrados', type: StudentEntity })
  @ApiOperation({ summary: 'Encontrar todos los estudiantes' })
  @Get()
  findAll() {
    return this.studentsService.findAll();
  }


  @ApiOkResponse({ description: 'Estudiante encontrado', type: StudentEntity })
  @ApiOperation({ summary: 'Encontrar un estudiante por su ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(+id);
  }

  @ApiOkResponse({ description: 'Estudiante Actualizado', type: CreateStudentDto })
  @ApiOperation({ summary: 'Actualizar un estudiante por su ID' })
  @Patch(':id')
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
