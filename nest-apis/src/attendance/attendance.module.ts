import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Attendance } from './attendance.entity';
import { Lecture } from 'src/lecture/lecture.entity';
import { User } from 'src/user/user.entity';
import { StudentCourse } from 'src/student-course/student-course.entity';
import { Hall } from 'src/hall/hall.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    AuthModule,
    SequelizeModule.forFeature([
      Attendance,
      Lecture,
      User,
      StudentCourse,
      Hall,
    ]),
  ],
  providers: [AttendanceService],
  controllers: [AttendanceController],
})
export class AttendanceModule {}
