import { Module } from '@nestjs/common';
import { DocumentComponentService } from './service/document-component.service';
import { DocumentComponentController } from './controller/document-component.controller';
import { DocumentComponentRepository } from './repository/document-component.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [DocumentComponentController],
  providers: [DocumentComponentService, DocumentComponentRepository],
  imports: [PrismaModule],
})
export class DocumentComponentModule {}
