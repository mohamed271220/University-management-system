import { Module } from '@nestjs/common';
import { StudentCourseService } from './student-course.service';
import { StudentCourseController } from './student-course.controller';

@Module({
  providers: [StudentCourseService],
  controllers: [StudentCourseController],
})
export class StudentCourseModule {}
