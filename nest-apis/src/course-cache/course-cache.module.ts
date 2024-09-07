import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CourseCacheService } from './course-cache.service';
import { CourseCacheController } from './course-cache.controller';
import { CourseCache } from '../entities/course-cache.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [SequelizeModule.forFeature([CourseCache]), AuthModule],
  controllers: [CourseCacheController],
  providers: [CourseCacheService],
  exports: [CourseCacheService],
})
export class CourseCacheModule {}
