import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CourseCacheService } from './course-cache.service';
import { CourseCacheController } from './course-cache.controller';
import { CourseCache } from '../entities/course-cache.entity';

@Module({
  imports: [SequelizeModule.forFeature([CourseCache])],
  controllers: [CourseCacheController],
  providers: [CourseCacheService],
})
export class CourseCacheModule {}
