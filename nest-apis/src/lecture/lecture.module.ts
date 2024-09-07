import { Module } from '@nestjs/common';
import { LectureService } from './lecture.service';
import { LectureController } from './lecture.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Lecture } from './lecture.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/user/user.entity';
import { Attendance } from 'src/entities/attendance.entity';
import { LectureHistory } from 'src/entities/lecture-history.entity';
import { Course } from 'src/course/course.entity';
import { Hall } from 'src/hall/hall.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([
      Lecture,
      User,
      Attendance,
      LectureHistory,
      Course,
      Hall,
    ]),
    AuthModule,
  ],
  providers: [LectureService],
  controllers: [LectureController],
  exports: [LectureService],
})
export class LectureModule {}
