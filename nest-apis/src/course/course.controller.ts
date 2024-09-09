import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import { CourseService } from './course.service';
import { Roles } from 'src/auth/roles.decorator';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Controller('api/v1/courses')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post('/')
  @Roles('Admin', 'Staff')
  createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.createCourse(createCourseDto);
  }

  @Get()
  getAllCourses(
    @Query('search') search: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.courseService.getAllCourses(search, limit, offset);
  }

  @Get(':courseId')
  getCourse(@Param('courseId') courseId: string) {
    return this.courseService.getCourseById(courseId);
  }

  @Get(':courseId/lectures')
  getCourseLectures(@Param('courseId') courseId: string) {
    return this.courseService.getCourseLectures(courseId);
  }

  @Put(':courseId')
  @Roles('Admin', 'Staff')
  updateCourse(
    @Param('courseId') courseId: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.courseService.updateCourse(courseId, updateCourseDto);
  }

  @Delete(':courseId')
  @Roles('Admin', 'Staff')
  deleteCourse(@Param('courseId') courseId: string) {
    return this.courseService.deleteCourse(courseId);
  }
}
