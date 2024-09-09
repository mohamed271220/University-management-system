import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Course } from '../course/course.entity';
import { Department } from '../department/department.entity';
import { AuthModule } from 'src/auth/auth.module';

import { User } from 'src/user/user.entity';
import { Lecture } from 'src/lecture/lecture.entity';
@Module({
  imports: [
    SequelizeModule.forFeature([Course, Department, User, Lecture]),
    AuthModule,
  ],
  providers: [CourseService],
  controllers: [CourseController],
  exports: [CourseService],
})
export class CourseModule {}
