import { Controller,UseInterceptors, UploadedFile, Post } from '@nestjs/common';
import { UploadFilesService } from './upload-files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
class Path {
  path: string;
}
@ApiTags('upload-files')
@Controller('upload-files')
export class UploadFilesController {
  constructor(private readonly uploadFilesService: UploadFilesService) {}
  @UseInterceptors(FileInterceptor('file'))
  @ApiOkResponse({
    description: 'Documentos subidos'
  })
  @ApiBody({ type: 'multipart/form-data'})
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Subir archivos pdf, imagenes' })
  @ApiOkResponse({ description: 'Documentos subidos', type: Path})
  @Post()
  create(@UploadedFile() file: Express.Multer.File) {
    return this.uploadFilesService.uploadFile(file);
  }
  
}
