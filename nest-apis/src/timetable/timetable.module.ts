import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/user/user.entity';
import { Course } from 'src/course/course.entity';
import { Department } from 'src/department/department.entity';
import { Semester } from 'src/semester/semester.entity';
import { Hall } from 'src/hall/hall.entity';
import { StudentCourse } from 'src/student-course/student-course.entity';
import { ProfessorCourse } from 'src/professor-course/professor-course.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lecture } from 'src/lecture/lecture.entity';
import { DepartmentYearCourses } from 'src/department-year-courses/department-year-courses.entity';

@Module({
  imports: [
    AuthModule,
    SequelizeModule.forFeature([
      User,
      Course,
      Department,
      Semester,
      Hall,
      StudentCourse,
      ProfessorCourse,
      Lecture,
      DepartmentYearCourses,
    ]),
  ],
  providers: [TimetableService],
  controllers: [TimetableController],
})
export class TimetableModule {}
