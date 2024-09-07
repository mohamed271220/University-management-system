import { Module } from '@nestjs/common';
import { ProfessorCourseService } from './professor-course.service';
import { ProfessorCourseController } from './professor-course.controller';

@Module({
  providers: [ProfessorCourseService],
  controllers: [ProfessorCourseController],
})
export class ProfessorCourseModule {}
