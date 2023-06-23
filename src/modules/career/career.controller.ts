import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  HttpException,
} from '@nestjs/common';
import { CareerService } from './career.service';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CareerDto } from './dto/career.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth/auth.guard';
@ApiTags('career')
// @ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
@Controller('career')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Post()
  @ApiOkResponse({
    description: 'Carrera creada correctamente',
    type: CareerDto,
  })
  @ApiOperation({ summary: 'Crear carrera' })
  create(@Body() createCareerDto: CreateCareerDto) {
    return this.careerService.create(createCareerDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Carreras encontradas correctamente',
    type: CareerDto,
    isArray: true,
  })
  @ApiOperation({ summary: 'Listar carreras' })
  findAll() {
    return this.careerService.findAll();
  }

  @Get('active')
  @ApiOkResponse({
    description: 'Carreras activas encontradas correctamente',
    type: CareerDto,
    isArray: true,
  })
  @ApiOperation({ summary: 'Listar carreras activas' })
  findAllActive() {
    return this.careerService.findAll(true);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Carrera encontrada correctamente',
    type: CareerDto,
  })
  @ApiOperation({ summary: 'Buscar carrera por id' })
  findOne(@Param('id') id: string) {
    return this.careerService.findOne(+id);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'Carrera actualizada correctamente',
    type: CareerDto,
  })
  @ApiOperation({ summary: 'Actualizar carrera' })
  update(@Param('id') id: string, @Body() updateCareerDto: UpdateCareerDto) {
    return this.careerService.update(+id, updateCareerDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Carrera eliminada correctamente',
  })
  @ApiInternalServerErrorResponse({
    description: 'Error al eliminar la carrera',
  })
  @ApiOperation({ summary: 'Eliminar carrera' })
  remove(@Param('id') id: string) {
    return this.careerService.remove(+id);
  }
}
