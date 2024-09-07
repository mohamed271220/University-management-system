import { Module } from '@nestjs/common';
import { StudentYearService } from './student-year.service';
import { StudentYearController } from './student-year.controller';

@Module({
  providers: [StudentYearService],
  controllers: [StudentYearController],
})
export class StudentYearModule {}
