import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { StudentYearService } from './student-year.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { CreateStudentYearDto } from './dto/create-student-year.dto';
import { UpdateStudentYearDto } from './dto/update-student-year.dto';

@Controller('api/v1/studentYears')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StudentYearController {
  constructor(private readonly studentYearService: StudentYearService) {}

  @Post('/')
  @Roles('Admin', 'Staff')
  createStudentYear(createStudentYearDto: CreateStudentYearDto) {
    return this.studentYearService.createStudentYear(createStudentYearDto);
  }

  @Get('/')
  @Roles('Admin', 'Staff')
  getAllStudentYears() {
    return this.studentYearService.getAllStudentYears();
  }

  @Get('students/:studentId')
  @Roles('Admin', 'Staff')
  getStudentYearsByStudentId(studentId: string) {
    return this.studentYearService.getStudentYearsByStudentId(studentId);
  }

  @Put(':studentYearId')
  @Roles('Admin', 'Staff')
  updateStudentYear(
    studentYearId: string,
    updateStudentYearDto: UpdateStudentYearDto,
  ) {
    return this.studentYearService.updateStudentYear(
      studentYearId,
      updateStudentYearDto,
    );
  }

  @Delete(':studentYearId')
  @Roles('Admin', 'Staff')
  deleteStudentYear(studentYearId: string) {
    return this.studentYearService.deleteStudentYear(studentYearId);
  }
}
