import { Controller, Get, Post, Body, Param, Delete, Put, HttpException } from '@nestjs/common';
import { TutorService } from './tutor.service';
import { CreateTutorDto } from './dto/create-tutor.dto';
import { UpdateTutorDto } from './dto/update-tutor.dto';
import { CreateAcademicTutorDto } from './dto/create-tutor-academic.dto';
import { CreateBussinesTutorDto } from './dto/create-tutor-bussiness.dto';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { TutorEntity } from './entities/tutor.entity';

@ApiTags('Tutor')
@Controller('tutor')
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un tutor Generico' })
  @ApiOkResponse({ description: 'Tutor creado correctamente', type: TutorEntity })
  @ApiBody({ type: CreateTutorDto })
  create(@Body() createTutorDto: CreateTutorDto) {
    return this.tutorService.create(createTutorDto);
  }

  @Post('academic')
  @ApiOperation({ summary: 'Crear un tutor Academico' })
  @ApiOkResponse({ description: 'Tutor creado correctamente', type: TutorEntity })
  @ApiBody({ type: CreateAcademicTutorDto })
  createAcademic(@Body() createTutorDto: CreateAcademicTutorDto) {
    return this.tutorService.createTutorAcademic(createTutorDto);
  }

  @Post('business')
  @ApiOperation({ summary: 'Crear un tutor Empresarial' })
  @ApiOkResponse({ description: 'Tutor creado correctamente', type: TutorEntity })
  @ApiBody({ type: CreateBussinesTutorDto })
  createBusiness(@Body() createTutorDto: CreateBussinesTutorDto) {
    return this.tutorService.createTutorBusiness(createTutorDto);
  }

  @Get()
  findAll() {
    return this.tutorService.findAll();
  }

  @Get('academic')
  @ApiOperation({ summary: 'Obtener todos los tutores Academicos' })
  @ApiOkResponse({ description: 'Tutores Academicos encontrados correctamente', type: [TutorEntity] })
  findAllAcademic() {
    return this.tutorService.findAllAcademic();
  }

  @Get('academic/active')
  @ApiOperation({ summary: 'Obtener todos los tutores Academicos activos' })
  @ApiOkResponse({ description: 'Tutores Academicos activos encontrados correctamente', type: [TutorEntity] })
  findAllAcademicActive() {
    return this.tutorService.findAllAcademic(true);
  }

  @Get('business')
  @ApiOperation({ summary: 'Obtener todos los tutores Empresariales' })
  @ApiOkResponse({ description: 'Tutores Empresariales encontrados correctamente', type: [TutorEntity] })
  findAllBusiness() {
    return this.tutorService.findAllBusiness();
  }

  @Get('business/active')
  @ApiOperation({ summary: 'Obtener todos los tutores Empresariales activos' })
  @ApiOkResponse({ description: 'Tutores Empresariales activos encontrados correctamente', type: [TutorEntity] })
  findAllBusinessActive() {
    return this.tutorService.findAllBusiness(true);
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOperation({ summary: 'Obtener un tutor por su id' })
  @ApiOkResponse({ description: 'Tutor encontrado correctamente', type: TutorEntity })
  findOne(@Param('id') id: string) {
    return this.tutorService.findOne(+id);
  }
  
  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un tutor' })
  @ApiBody({ type: UpdateTutorDto })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOkResponse({ description: 'Tutor actualizado correctamente', type: TutorEntity })
  update(@Param('id') id: string, @Body() updateTutorDto: UpdateTutorDto) {
    return this.tutorService.update(+id, updateTutorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un tutor' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiOkResponse({ description: 'Tutor eliminado correctamente', type: HttpException })
  remove(@Param('id') id: string) {
    return this.tutorService.remove(+id);
  }
}
