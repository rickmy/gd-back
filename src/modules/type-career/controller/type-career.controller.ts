import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TypeCareerService } from '../service/type-career.service';
import { CreateTypeCareerDto } from '../dto/create-type-career.dto';
import { UpdateTypeCareerDto } from '../dto/update-type-career.dto';

@ApiTags('type-career')
@Controller('type-career')
export class TypeCareerController {
  constructor(private readonly typeCareerService: TypeCareerService) {}

  @Post()
  create(@Body() createTypeCareerDto: CreateTypeCareerDto) {
    return this.typeCareerService.create(createTypeCareerDto);
  }

  @Get()
  findAll() {
    return this.typeCareerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeCareerService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypeCareerDto: UpdateTypeCareerDto,
  ) {
    return this.typeCareerService.update(id, updateTypeCareerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeCareerService.remove(id);
  }
}
