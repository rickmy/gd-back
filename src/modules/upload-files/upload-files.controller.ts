import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UploadFilesService } from './upload-files.service';
import { CreateUploadFileDto } from './dto/create-upload-file.dto';
import { UpdateUploadFileDto } from './dto/update-upload-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('upload-files')
export class UploadFilesController {
  constructor(private readonly uploadFilesService: UploadFilesService) {}
  @UseInterceptors(FileInterceptor('file'))
  @ApiOkResponse({
    description: 'Documentos subidos'
  })
  @ApiBody({ required: true, type: FileInterceptor })
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Subir pdf' })
  @Post()
  create(@UploadedFile() file: Express.Multer.File) {
    return this.uploadFilesService.uploadFile(file);
  }
  
}
