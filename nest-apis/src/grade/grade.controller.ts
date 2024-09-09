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
import { GradeService } from './grade.service';
import { Roles } from 'src/auth/roles.decorator';
import { CreateGradeDTO } from './dto/create-grade.dto';
import { UpdateGradeDTO } from './dto/update-grade.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/user.entity';

@Controller('api/v1/grades')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Post('/')
  @Roles('Professor', 'Admin')
  createGrade(@GetUser() user: User, @Body() createGradeDto: CreateGradeDTO) {
    return this.gradeService.createGrade(user, createGradeDto);
  }

  @Get('/')
  @Roles('Staff', 'Admin')
  getAllGrades(
    @Query('search') search: string,
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.gradeService.getAllGrades(search, limit, offset);
  }

  @Get(':gradeId')
  @Roles('Staff', 'Admin')
  getGrade(@Param('gradeId') gradeId: string) {
    return this.gradeService.getGradeById(gradeId);
  }

  // get all grades by student id (if role is student, only return grades for that student)
  @Get('students/:studentId')
  getGradesByStudent(@Param('studentId') studentId: string) {
    return this.gradeService.getGradesByStudent(studentId);
  }

  // get all grades by student id and semester id
  @Get('students/:studentId/semesters/:semesterId')
  getGradesByStudentAndSemester(
    @Param('studentId') studentId: string,
    @Param('semesterId') semesterId: string,
  ) {
    return this.gradeService.getGradesByStudentAndSemester(
      studentId,
      semesterId,
    );
  }

  // get all grades by course id
  @Get('courses/:courseId')
  @Roles('Staff', 'Admin', 'Professor')
  getGradesByCourse(@Param('courseId') courseId: string) {
    return this.gradeService.getGradesByCourse(courseId);
  }

  // get all grades by semester id
  @Get('semesters/:semesterId')
  @Roles('Staff', 'Admin')
  getGradesBySemester(@Param('semesterId') semesterId: string) {
    return this.gradeService.getGradesBySemester(semesterId);
  }

  // get all grades for courses taught by professor
  @Get('professors/:professorId')
  @Roles('Professor', 'Admin')
  getGradesByProfessor(@Param('professorId') professorId: string) {
    return this.gradeService.getGradesByProfessor(professorId);
  }

  @Put(':gradeId')
  @Roles('Professor', 'Admin')
  updateGrade(
    @Param('gradeId') gradeId: string,
    @Body() updateGradeDto: UpdateGradeDTO,
    @GetUser() user: User,
  ) {
    return this.gradeService.updateGrade(gradeId, updateGradeDto, user);
  }

  @Delete(':gradeId')
  @Roles('Admin')
  deleteGrade(@Param('gradeId') gradeId: string) {
    return this.gradeService.deleteGrade(gradeId);
  }
}
