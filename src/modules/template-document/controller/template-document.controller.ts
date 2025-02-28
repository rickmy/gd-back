import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TemplateDocumentService } from '../service/template-document.service';
import { CreateTemplateDocumentDto } from '../dto/create-template-document.dto';
import { UpdateTemplateDocumentDto } from '../dto/update-template-document.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('template-document')
@Controller('template-document')
export class TemplateDocumentController {
  constructor(
    private readonly templateDocumentService: TemplateDocumentService,
  ) {}

  @Post()
  create(@Body() createTemplateDocumentDto: CreateTemplateDocumentDto) {
    return this.templateDocumentService.create(createTemplateDocumentDto);
  }

  @Get()
  findAll() {
    return this.templateDocumentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.templateDocumentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTemplateDocumentDto: UpdateTemplateDocumentDto,
  ) {
    return this.templateDocumentService.update(id, updateTemplateDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.templateDocumentService.remove(id);
  }
}
