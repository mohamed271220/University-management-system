import { Module } from '@nestjs/common';
import { DepartmentYearCoursesService } from './department-year-courses.service';
import { DepartmentYearCoursesController } from './department-year-courses.controller';

@Module({
  providers: [DepartmentYearCoursesService],
  controllers: [DepartmentYearCoursesController],
})
export class DepartmentYearCoursesModule {}
