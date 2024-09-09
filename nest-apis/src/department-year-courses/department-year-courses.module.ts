import { Module } from '@nestjs/common';
import { DepartmentYearCoursesService } from './department-year-courses.service';
import { DepartmentYearCoursesController } from './department-year-courses.controller';
import { Department } from 'src/department/department.entity';
import { Course } from 'src/course/course.entity';
import { DepartmentYearCourses } from './department-year-courses.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Department, Course, DepartmentYearCourses]),
    AuthModule,
  ],
  providers: [DepartmentYearCoursesService],
  controllers: [DepartmentYearCoursesController],
})
export class DepartmentYearCoursesModule {}
