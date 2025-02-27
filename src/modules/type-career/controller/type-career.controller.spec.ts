import { Test, TestingModule } from '@nestjs/testing';
import { TypeCareerController } from './type-career.controller';
import { TypeCareerService } from '../service/type-career.service';

describe('TypeCareerController', () => {
  let controller: TypeCareerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeCareerController],
      providers: [TypeCareerService],
    }).compile();

    controller = module.get<TypeCareerController>(TypeCareerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
