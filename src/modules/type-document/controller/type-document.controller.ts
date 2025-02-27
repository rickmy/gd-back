import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TypeDocumentService } from '../service/type-document.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateTypeDocumentDto } from '../dto/update-type-document.dto';
import { CreateTypeDocumentDto } from '../dto/create-type-document.dto';

@ApiTags('type-document')
@Controller('type-document')
export class TypeDocumentController {
  constructor(private readonly typeDocumentService: TypeDocumentService) {}

  @Post()
  create(@Body() createTypeDocument: CreateTypeDocumentDto) {
    return this.typeDocumentService.create(createTypeDocument);
  }

  @Get()
  findAll() {
    return this.typeDocumentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeDocumentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTypeDocumentDto: UpdateTypeDocumentDto,
  ) {
    return this.typeDocumentService.update(id, updateTypeDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeDocumentService.remove(id);
  }
}
