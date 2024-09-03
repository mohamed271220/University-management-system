import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CourseCacheService } from './course-cache.service';
import { CreateCourseCacheDto, UpdateCourseCacheDto } from './dto';
import { CourseCache } from '../entities/course-cache.entity';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('course-cache')
export class CourseCacheController {
  constructor(private readonly courseCacheService: CourseCacheService) {}

  @Post()
  @Roles('Admin', 'Staff') // Protects this route to be accessible only by Admins
  @UseGuards(RolesGuard) // Protects this route to be accessible only by Admins
  create(
    @Body() createCourseCacheDto: CreateCourseCacheDto,
  ): Promise<CourseCache> {
    return this.courseCacheService.create(createCourseCacheDto);
  }

  @Get()
  @Roles('Admin', 'Staff') // Protects this route to be accessible only by Admins
  @UseGuards(RolesGuard) // Protects this route to be accessible only by Admins
  findAll(): Promise<CourseCache[]> {
    return this.courseCacheService.findAll();
  }

  @Get(':courseId')
  @Roles('Admin', 'Staff') // Protects this route to be accessible only by Admins
  @UseGuards(RolesGuard) // Protects this route to be accessible only by Admins
  findOne(@Param('courseId') courseId: string): Promise<CourseCache> {
    return this.courseCacheService.findOne(courseId);
  }

  @Put(':courseId')
  @Roles('Admin', 'Staff') // Protects this route to be accessible only by Admins
  @UseGuards(RolesGuard) // Protects this route to be accessible only by Admins
  update(
    @Param('courseId') courseId: string,
    @Body() updateCourseCacheDto: UpdateCourseCacheDto,
  ): Promise<CourseCache> {
    return this.courseCacheService.update(courseId, updateCourseCacheDto);
  }

  @Delete(':courseId')
  @Roles('Admin', 'Staff') // Protects this route to be accessible only by Admins
  @UseGuards(RolesGuard) // Protects this route to be accessible only by Admins
  remove(@Param('courseId') courseId: string): Promise<void> {
    return this.courseCacheService.remove(courseId);
  }
}
