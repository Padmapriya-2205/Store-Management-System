import { Test, TestingModule } from '@nestjs/testing';
import { EmpController } from './emp.controller';
import { EmpService } from './emp.service';

describe('EmpController', () => {
  let controller: EmpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpController],
      providers: [{ provide: EmpService, useValue: {} }],
    }).compile();

    controller = module.get<EmpController>(EmpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
