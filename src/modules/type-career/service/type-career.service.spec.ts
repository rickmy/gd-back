import { Test, TestingModule } from '@nestjs/testing';
import { TypeCareerService } from './type-career.service';

describe('TypeCareerService', () => {
  let service: TypeCareerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeCareerService],
    }).compile();

    service = module.get<TypeCareerService>(TypeCareerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
