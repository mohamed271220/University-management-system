import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/role.guard';
import { TimetableService, Year } from './timetable.service';

@Controller('timetable')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  // get student timetable
  @Get('students/:studentId/:semesterId')
  getStudentTimetable(
    @Param('studentId') studentId: string,
    @Param('semesterId') semesterId: string,
  ) {
    return this.timetableService.getStudentTimetable(studentId, semesterId);
  }

  // get professor timetable
  @Get('professors/:professorId')
  getProfessorTimetable(@Param('professorId') professorId: string) {
    return this.timetableService.getProfessorTimetable(professorId);
  }

  // get the timetable for a department
  @Get('departments/:departmentId')
  getDepartmentTimetable(@Param('departmentId') departmentId: string) {
    return this.timetableService.getDepartmentTimetable(departmentId);
  }

  // get timetable for a hall
  @Get('halls/:hallId')
  getHallTimetable(@Param('hallId') hallId: string) {
    return this.timetableService.getHallTimetable(hallId);
  }

  // get the timetable for a certain class (student year) in a department
  @Get('departments/:departmentId/years')
  getStudentYearTimetable(
    @Param('departmentId') departmentId: string,
    @Body() year: Year,
  ) {
    return this.timetableService.getStudentYearTimetable(departmentId, year);
  }
}
