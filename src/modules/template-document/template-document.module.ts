import { Module } from '@nestjs/common';
import { TemplateDocumentService } from './service/template-document.service';
import { TemplateDocumentController } from './controller/template-document.controller';
import { TemplateDocumentRepository } from './repository/template-document.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TemplateDocumentController],
  providers: [TemplateDocumentService, TemplateDocumentRepository],
  imports: [PrismaModule],
})
export class TemplateDocumentModule {}
