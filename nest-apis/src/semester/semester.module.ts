import { Module } from '@nestjs/common';
import { SemesterService } from './semester.service';
import { SemesterController } from './semester.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Semester } from './semester.entity';
import { Course } from 'src/course/course.entity';
import { Grade } from 'src/grade/grade.entity';
import { User } from 'src/user/user.entity';
import { StudentCourse } from 'src/student-course/student-course.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forFeature([Semester, Course, Grade, User, StudentCourse]),
    AuthModule,
  ],
  providers: [SemesterService],
  controllers: [SemesterController],
})
export class SemesterModule {}
