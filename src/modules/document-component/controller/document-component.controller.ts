import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DocumentComponentService } from '../service/document-component.service';
import { CreateDocumentComponentDto } from '../dto/create-document-component.dto';
import { UpdateDocumentComponentDto } from '../dto/update-document-component.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('document-component')
@Controller('document-component')
export class DocumentComponentController {
  constructor(
    private readonly documentComponentService: DocumentComponentService,
  ) {}

  @Post()
  create(@Body() createDocumentComponentDto: CreateDocumentComponentDto) {
    return this.documentComponentService.create(createDocumentComponentDto);
  }

  @Get()
  findAll() {
    return this.documentComponentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentComponentService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDocumentComponentDto: UpdateDocumentComponentDto,
  ) {
    return this.documentComponentService.update(id, updateDocumentComponentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentComponentService.remove(id);
  }
}
