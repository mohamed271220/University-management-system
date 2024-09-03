import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CourseCache } from '../entities/course-cache.entity';
import { CreateCourseCacheDto, UpdateCourseCacheDto } from './dto';

@Injectable()
export class CourseCacheService {
  constructor(
    @InjectModel(CourseCache)
    private readonly courseCacheModel: typeof CourseCache,
  ) {}

  async create(
    createCourseCacheDto: CreateCourseCacheDto,
  ): Promise<CourseCache> {
    return this.courseCacheModel.create(createCourseCacheDto);
  }

  async findAll(): Promise<CourseCache[]> {
    return this.courseCacheModel.findAll();
  }

  async findOne(courseId: string): Promise<CourseCache> {
    const cache = await this.courseCacheModel.findByPk(courseId);
    if (!cache) {
      throw new NotFoundException('Course Cache not found');
    }
    return cache;
  }

  async update(
    courseId: string,
    updateCourseCacheDto: UpdateCourseCacheDto,
  ): Promise<CourseCache> {
    const cache = await this.findOne(courseId);
    return cache.update(updateCourseCacheDto);
  }

  async remove(courseId: string): Promise<void> {
    const cache = await this.findOne(courseId);
    await cache.destroy();
  }
}
