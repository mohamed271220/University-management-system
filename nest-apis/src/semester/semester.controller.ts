import {
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
import { SemesterService } from './semester.service';
import { Roles } from 'src/auth/roles.decorator';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';

@Controller('api/v1/semesters')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class SemesterController {
  constructor(private readonly semesterService: SemesterService) {}

  @Post('/')
  @Roles('Admin', 'Staff')
  createSemester(createSemesterDto: CreateSemesterDto) {
    return this.semesterService.createSemester(createSemesterDto);
  }

  @Get('/')
  getAllSemesters() {
    return this.semesterService.getAllSemesters();
  }

  @Get(':semesterId')
  getSemester(@Param('semesterId') semesterId: string) {
    return this.semesterService.getSemester(semesterId);
  }

  @Get(':semesterId/grades')
  @Roles('Admin', 'Staff')
  getSemesterGrades(@Param('semesterId') semesterId: string) {
    return this.semesterService.getSemesterGrades(semesterId);
  }

  @Get(':semesterId/student-courses')
  @Roles('Admin', 'Staff')
  getStudentEnrolledCourses(@Param('semesterId') semesterId: string) {
    return this.semesterService.getStudentEnrolledCourses(semesterId);
  }

  @Put(':semesterId')
  @Roles('Admin', 'Staff')
  updateSemester(
    @Param('semesterId') semesterId: string,
    updateSemesterDto: UpdateSemesterDto,
  ) {
    return this.semesterService.updateSemester(semesterId, updateSemesterDto);
  }

  @Delete(':semesterId')
  @Roles('Admin', 'Staff')
  deleteSemester(@Param('semesterId') semesterId: string) {
    return this.semesterService.deleteSemester(semesterId);
  }
}
