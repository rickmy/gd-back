import { Module } from '@nestjs/common';
import { DocumentService } from './service/document.service';
import { DocumentController } from './controller/document.controller';
import { DocumentRepository } from './repository/document.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [DocumentController],
  providers: [DocumentService, DocumentRepository],
  imports: [PrismaModule],
})
export class DocumentModule {}
