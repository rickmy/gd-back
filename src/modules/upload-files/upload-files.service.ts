import { Injectable } from '@nestjs/common';
import { CreateUploadFileDto } from './dto/create-upload-file.dto';
import { UpdateUploadFileDto } from './dto/update-upload-file.dto';

@Injectable()
export class UploadFilesService {
  async uploadFile(file: Express.Multer.File) {
   // const { data, error } = await storage
  }
  
}
