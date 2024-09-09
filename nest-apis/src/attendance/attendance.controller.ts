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
import { AttendanceService } from './attendance.service';
import { Roles } from 'src/auth/roles.decorator';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/user.entity';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';

@Controller('api/v1/attendances')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('/')
  @Roles('Admin', 'Professor', 'Staff')
  createAttendance(
    @Body() createAttendanceDto: CreateAttendanceDto,
    @GetUser() user: User,
  ) {
    return this.attendanceService.createAttendance(createAttendanceDto, user);
  }

  @Get('/')
  @Roles('Admin', 'Staff')
  getAllAttendance(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
  ) {
    return this.attendanceService.getAllAttendance(limit, offset);
  }

  @Get(':attendanceId')
  @Roles('Admin', 'Staff')
  getAttendance(@Param('attendanceId') attendanceId: string) {
    return this.attendanceService.getAttendance(attendanceId);
  }

  @Get('students/:studentId')
  getStudentAttendance(
    @Param('studentId') studentId: string,
    @GetUser() user: User,
  ) {
    return this.attendanceService.getStudentAttendance(studentId, user);
  }

  @Get('lectures/:lectureId')
  @Roles('Admin', 'Staff', 'Professor')
  getLectureAttendance(@Param('lectureId') lectureId: string) {
    return this.attendanceService.getLectureAttendance(lectureId);
  }

  @Get('students/:studentId/lectures/:lectureId')
  @Roles('Admin', 'Staff', 'Professor')
  getLectureStudentAttendance(
    @Param('lectureId') lectureId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.attendanceService.getLectureStudentAttendance(
      lectureId,
      studentId,
    );
  }

  @Put(':attendanceId/status')
  @Roles('Admin', 'Staff', 'Professor')
  updateAttendanceStatus(
    @Param('attendanceId') attendanceId: string,
    @Body('status') updateAttendanceDto: UpdateAttendanceDto,
  ) {
    return this.attendanceService.updateAttendanceStatus(
      attendanceId,
      updateAttendanceDto,
    );
  }

  @Delete(':attendanceId')
  @Roles('Admin', 'Staff')
  deleteAttendance(@Param('attendanceId') attendanceId: string) {
    return this.attendanceService.deleteAttendance(attendanceId);
  }
}
