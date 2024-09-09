import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { DepartmentController } from './department.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Department } from './department.entity';
import { Course } from 'src/course/course.entity';
import { Hall } from 'src/hall/hall.entity';

@Module({
  imports: [SequelizeModule.forFeature([Department, Course, Hall]), AuthModule],
  providers: [DepartmentService],
  controllers: [DepartmentController],
})
export class DepartmentModule {}
