import { Test, TestingModule } from '@nestjs/testing';
import { DocumentComponentService } from './document-component.service';

describe('DocumentComponentService', () => {
  let service: DocumentComponentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DocumentComponentService],
    }).compile();

    service = module.get<DocumentComponentService>(DocumentComponentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
