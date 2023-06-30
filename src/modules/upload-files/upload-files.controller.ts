import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UploadFilesService } from './upload-files.service';
import { CreateUploadFileDto } from './dto/create-upload-file.dto';
import { UpdateUploadFileDto } from './dto/update-upload-file.dto';

@Controller('upload-files')
export class UploadFilesController {
  constructor(private readonly uploadFilesService: UploadFilesService) {}

  @Post()
  create(@Body() createUploadFileDto: CreateUploadFileDto) {
    return this.uploadFilesService.create(createUploadFileDto);
  }
  
}
