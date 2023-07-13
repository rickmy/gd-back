import { HttpException, Injectable, Logger } from '@nestjs/common';
import { StorageClient } from '@supabase/storage-js';
import config from 'src/core/config';

@Injectable()
export class UploadFilesService {
  private readonly storage = new StorageClient(config().URL_SUPABASE, {
    Authorization: `Bearer ${config().SERVICE_KEY}`,
    apiKey: config().SERVICE_KEY,
  });
  private readonly bucket = 'complexivo';
  private readonly logger = Logger;

  async listBucket() {
    const { data, error } = await this.storage.listBuckets();
    if (error) {
      this.logger.error(error);
      throw error;
    }
    return data;
  }

  async createBucket(name: string) {
    const { data, error } = await this.storage.createBucket(name);
    if (error) {
      throw error;
    }
    return data;
  }

  async uploadFile(file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('No se ha subido ningun archivo', 400);
    }
    this.logger.log('Subiendo archivo a supabase');
    const { data, error } = await this.storage
      .from(this.bucket)
      .upload(`docs/${file.originalname}`, file.buffer);
    if (error) {
      this.logger.error(error)
      throw new HttpException(`Error SupaBase: ${error.message}`, 400);
    }
    return data;
  }

  async removeFile(name: string) {
    const { data, error } = await this.storage
      .from(this.bucket)
      .remove([`docs/${name}`]);
    if (error) {
      this.logger.error(error)
      throw new HttpException(`Error SupaBase: ${error.message}`, 400);
    }
    return data;
  }
  
  
}
