import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import { StudentCourseService } from './student-course.service';
import {
  CreateStudentCourseDto,
  UpdateStudentCourseDto,
} from './dto/index.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/user/user.entity';

@Controller('api/v1/studentCourses')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StudentCourseController {
  constructor(private readonly studentCourseService: StudentCourseService) {}

  // enroll student in a course
  @Post('enroll/:studentId/courses')
  @Roles('Student', 'Admin')
  enrollStudentInCourse(
    @Param('studentId') studentId: string,
    @Body() createStudentCourseDto: CreateStudentCourseDto,
    @GetUser() user: User,
  ) {
    return this.studentCourseService.enrollStudentInCourse(
      studentId,
      createStudentCourseDto,
      user,
    );
  }

  // Retrieve all courses a student is enrolled in.
  @Get('students/:studentId/courses')
  @Roles('Student', 'Admin', 'Staff')
  getStudentCourses(
    @Param('studentId') studentId: string,
    @GetUser() user: User,
  ) {
    return this.studentCourseService.getStudentCoursesByStudentId(
      studentId,
      user,
    );
  }

  // Retrieve all students enrolled in a course.
  @Get('courses/:courseId/students')
  @Roles('Admin', 'Staff', 'Professor')
  getCourseStudents(
    @Param('courseId') courseId: string,
    @GetUser() user: User,
  ) {
    return this.studentCourseService.getStudentsByCourseId(courseId, user);
  }

  @Get('students/:studentId/courses/:courseId')
  @Roles('Professor', 'Admin', 'Staff')
  getStudentCourse(
    @Param('studentId') studentId: string,
    @Param('courseId') courseId: string,
    @GetUser() user: User,
  ) {
    return this.studentCourseService.getStudentCourseById(
      studentId,
      courseId,
      user,
    );
  }

  // Update a student's course
  @Put('students/:studentId/courses/:courseId/semester')
  @Roles('Student', 'Admin')
  updateStudentCourse(
    @Param('studentId') studentId: string,
    @Param('courseId') courseId: string,
    @Body() updateStudentCourseDto: UpdateStudentCourseDto,
    @GetUser() user: User,
  ) {
    return this.studentCourseService.updateStudentCourse(
      studentId,
      courseId,
      updateStudentCourseDto,
      user,
    );
  }

  // Remove a student from a course
  @Delete('students/:studentId/courses/:courseId')
  @Roles('Student', 'Admin')
  removeStudentFromCourse(
    @Param('studentId') studentId: string,
    @Param('courseId') courseId: string,
    @GetUser() user: User,
  ) {
    return this.studentCourseService.removeStudentFromCourse(
      studentId,
      courseId,
      user,
    );
  }
}
