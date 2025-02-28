import { Test, TestingModule } from '@nestjs/testing';
import { TemplateDocumentService } from './template-document.service';

describe('TemplateDocumentService', () => {
  let service: TemplateDocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateDocumentService],
    }).compile();

    service = module.get<TemplateDocumentService>(TemplateDocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
