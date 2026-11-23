import { Module } from '@nestjs/common';
import { EmpService } from './emp.service';
import { EmpController } from './emp.controller';
import { EmpModel } from './emp.model';

@Module({
  controllers: [EmpController],
  providers: [EmpService, EmpModel],
})
export class EmpModule {}
