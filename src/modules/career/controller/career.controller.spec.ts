import { Test, TestingModule } from '@nestjs/testing';
import { CareerController } from '../controller/career.controller';
import { CareerService } from '../service/career.service';

describe('CareerController', () => {
  let controller: CareerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CareerController],
      providers: [CareerService],
    }).compile();

    controller = module.get<CareerController>(CareerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
