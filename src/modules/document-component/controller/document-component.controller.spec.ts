import { Test, TestingModule } from '@nestjs/testing';
import { DocumentComponentController } from './document-component.controller';
import { DocumentComponentService } from '../service/document-component.service';

describe('DocumentComponentController', () => {
  let controller: DocumentComponentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentComponentController],
      providers: [DocumentComponentService],
    }).compile();

    controller = module.get<DocumentComponentController>(
      DocumentComponentController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
