import { Module } from '@nestjs/common';
import { StudentCourseService } from './student-course.service';
import { StudentCourseController } from './student-course.controller';
import { AuthModule } from 'src/auth/auth.module';
import { StudentCourse } from './student-course.entity';
import { User } from 'src/user/user.entity';
import { Course } from 'src/course/course.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { Semester } from 'src/semester/semester.entity';

@Module({
  imports: [
    AuthModule,
    SequelizeModule.forFeature([StudentCourse, User, Course, Semester]),
  ],
  providers: [StudentCourseService],
  controllers: [StudentCourseController],
})
export class StudentCourseModule {}
