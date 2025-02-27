import { Module } from '@nestjs/common';
import { TypeDocumentService } from './service/type-document.service';
import { TypeDocumentController } from './controller/type-document.controller';
import { TypeDocumentRepository } from './repository/type-document.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TypeDocumentController],
  providers: [TypeDocumentService, TypeDocumentRepository],
  imports: [PrismaModule],
})
export class TypeDocumentModule {}
