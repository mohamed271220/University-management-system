import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { AuthModule } from 'src/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Grade } from './grade.entity';
import { User } from 'src/user/user.entity';
import { Semester } from 'src/semester/semester.entity';
import { Course } from 'src/course/course.entity';
import { StudentCourse } from 'src/student-course/student-course.entity';
import { ProfessorCourse } from 'src/professor-course/professor-course.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Grade,
      User,
      Semester,
      Course,
      StudentCourse,
      ProfessorCourse,
    ]),
    AuthModule,
  ],
  providers: [GradeService],
  controllers: [GradeController],
  exports: [GradeService],
})
export class GradeModule {}
