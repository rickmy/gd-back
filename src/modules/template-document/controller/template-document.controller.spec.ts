import { Test, TestingModule } from '@nestjs/testing';
import { TemplateDocumentController } from './template-document.controller';
import { TemplateDocumentService } from '../service/template-document.service';

describe('TemplateDocumentController', () => {
  let controller: TemplateDocumentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateDocumentController],
      providers: [TemplateDocumentService],
    }).compile();

    controller = module.get<TemplateDocumentController>(
      TemplateDocumentController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
