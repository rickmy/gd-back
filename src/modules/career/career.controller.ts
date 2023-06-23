import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CareerService } from './career.service';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CareerEntity } from './entities/career.entity';
import { CareerDto } from './dto/career.dto';
@ApiTags('career')
@Controller('career')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Post()
  @ApiOkResponse({
    description: 'Carrera creada correctamente',
    type: CareerDto,
  })
  create(@Body() createCareerDto: CreateCareerDto) {
    return this.careerService.create(createCareerDto);
  }

  @Get()
  findAll() {
    return this.careerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.careerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCareerDto: UpdateCareerDto) {
    return this.careerService.update(+id, updateCareerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.careerService.remove(+id);
  }
}
