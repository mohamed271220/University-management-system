import { Module } from '@nestjs/common';
import { StudentYearService } from './student-year.service';
import { StudentYearController } from './student-year.controller';
import { AuthModule } from 'src/auth/auth.module';
import { StudentYear } from './student-year.entity';
import { User } from 'src/user/user.entity';
import { Course } from 'src/course/course.entity';
import { Department } from 'src/department/department.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    AuthModule,
    SequelizeModule.forFeature([StudentYear, User, Course, Department]),
  ],
  providers: [StudentYearService],
  controllers: [StudentYearController],
})
export class StudentYearModule {}
