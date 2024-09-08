import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import { ProfessorCourseService } from './professor-course.service';
import { CreateProfessorCourseDto } from './dto/create-professor-course.dto';
import { Roles } from 'src/auth/roles.decorator';

@Controller('api/v1/professor-course')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ProfessorCourseController {
  constructor(
    private readonly professorCourseService: ProfessorCourseService,
  ) {}

  // Add Professor to Course
  @Post('/')
  @Roles('Admin', 'Staff')
  createProfessorCourse(
    @Body() createProfessorCourseDto: CreateProfessorCourseDto,
  ) {
    return this.professorCourseService.createProfessorCourse(
      createProfessorCourseDto,
    );
  }

  // get all courses for a professor
  @Get('/')
  getAllProfessorCourses() {
    return this.professorCourseService.getAllProfessorCourses();
  }

  // Retrieve a specific professor course by its ID.
  @Get('professor/:professorId/course/:courseId')
  getProfessorCourse(
    @Param('professorId') professorId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.professorCourseService.getProfessorCourse(
      professorId,
      courseId,
    );
  }

  // Retrieve all courses associated with a specific professor.
  @Get('professors/:professorId/courses')
  getProfessorCourses(@Param('professorId') professorId: string) {
    return this.professorCourseService.getProfessorCourses(professorId);
  }

  // Retrieve all professors associated with a specific course
  @Get('courses/:courseId/professors')
  getCourseProfessors(@Param('courseId') courseId: string) {
    return this.professorCourseService.getCourseProfessors(courseId);
  }

  // Delete a specific professor course by its ID.
  @Delete('professor/:professorId/course/:courseId')
  @Roles('Admin', 'Staff')
  deleteProfessorCourse(
    @Param('professorId') professorId: string,
    @Param('courseId') courseId: string,
  ) {
    return this.professorCourseService.deleteProfessorCourse(
      professorId,
      courseId,
    );
  }
}
