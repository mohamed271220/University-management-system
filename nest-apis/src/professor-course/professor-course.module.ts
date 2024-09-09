import { Module } from '@nestjs/common';
import { ProfessorCourseService } from './professor-course.service';
import { ProfessorCourseController } from './professor-course.controller';
import { ProfessorCourse } from './professor-course.entity';
import { User } from 'src/user/user.entity';
import { Course } from 'src/course/course.entity';
import { AuthModule } from 'src/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([ProfessorCourse, User, Course]),
    AuthModule,
  ],
  providers: [ProfessorCourseService],
  controllers: [ProfessorCourseController],
})
export class ProfessorCourseModule {}
