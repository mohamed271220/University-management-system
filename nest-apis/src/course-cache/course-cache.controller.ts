import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CourseCacheService } from './course-cache.service';
import { CreateCourseCacheDto, UpdateCourseCacheDto } from './dto';
import { CourseCache } from '../entities/course-cache.entity';

@Controller('course-cache')
export class CourseCacheController {
  constructor(private readonly courseCacheService: CourseCacheService) {}

  @Post()
  create(
    @Body() createCourseCacheDto: CreateCourseCacheDto,
  ): Promise<CourseCache> {
    return this.courseCacheService.create(createCourseCacheDto);
  }

  @Get()
  findAll(): Promise<CourseCache[]> {
    return this.courseCacheService.findAll();
  }

  @Get(':courseId')
  findOne(@Param('courseId') courseId: string): Promise<CourseCache> {
    return this.courseCacheService.findOne(courseId);
  }

  @Put(':courseId')
  update(
    @Param('courseId') courseId: string,
    @Body() updateCourseCacheDto: UpdateCourseCacheDto,
  ): Promise<CourseCache> {
    return this.courseCacheService.update(courseId, updateCourseCacheDto);
  }

  @Delete(':courseId')
  remove(@Param('courseId') courseId: string): Promise<void> {
    return this.courseCacheService.remove(courseId);
  }
}
